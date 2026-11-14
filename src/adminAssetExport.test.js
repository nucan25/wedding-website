import test from 'node:test';
import assert from 'node:assert/strict';

import { collectProjectAssetEntries, buildProjectAssetManifest, normalizeImageGallery } from './adminAssetExport.js';
import { getProgramEvents } from './eventData.js';

const sampleConfig = {
  heroImage: 'data:image/png;base64,AAAA',
  events: {
    'event-wedding': {
      heroImage: 'data:image/jpeg;base64,BBBB',
    },
    'event-kina': {
      heroImage: 'data:image/webp;base64,CCCC',
    },
  },
  storyByEvent: {
    'event-wedding': {
      items: [
        { image: 'data:image/png;base64,DDDD' },
        { image: 'data:image/png;base64,AAAA' },
      ],
    },
  },
  imageGallery: ['data:image/jpeg;base64,EEEE', 'data:image/jpeg;base64,BBBB'],
};

test('collectProjectAssetEntries returns unique files and stable names', () => {
  const entries = collectProjectAssetEntries(sampleConfig);

  assert.equal(entries.length, 5);
  assert.deepEqual(
    entries.map((entry) => entry.fileName),
    ['hero.png', 'event-wedding-hero.jpg', 'event-kina-hero.webp', 'event-wedding-story-1.png', 'gallery-1.jpg'],
  );
});

test('buildProjectAssetManifest includes flat asset map and file list', () => {
  const manifest = buildProjectAssetManifest(sampleConfig);

  assert.equal(manifest.assets.length, 5);
  assert.equal(manifest.assets[0].path, 'public/uploads/hero.png');
  assert.ok(manifest.assets[0].dataUrl.startsWith('data:image/png;base64,'));
});

test('normalizeImageGallery keeps existing photos and appends new ones without leaving empty slots', () => {
  const normalized = normalizeImageGallery([
    'https://example.com/existing-1.jpg',
    '',
    'https://example.com/existing-2.jpg',
  ]);

  assert.deepEqual(normalized, ['https://example.com/existing-1.jpg', 'https://example.com/existing-2.jpg']);

  const appended = normalizeImageGallery(['https://example.com/existing-1.jpg', 'https://example.com/existing-2.jpg']);
  const nextGallery = [...appended];
  nextGallery[2] = 'https://example.com/new-3.jpg';
  const finalGallery = normalizeImageGallery(nextGallery);

  assert.deepEqual(finalGallery, ['https://example.com/existing-1.jpg', 'https://example.com/existing-2.jpg', 'https://example.com/new-3.jpg']);
});

test('directions links use current-location route format and never repeat the destination as origin', () => {
  const events = getProgramEvents({
    defaultEventId: 'event-wedding',
    events: {
      'event-wedding': {
        id: 'event-wedding',
        title: 'Düğün',
        date: '2027-01-30T18:00:00+03:00',
        venueName: 'Armada Düğün ve Kongre Salonu',
        venueAddress: 'Harput Mahallesi, 5. Sk. No:17, 25070 Palandöken/Erzurum',
        directionsUrl: 'https://www.google.com/maps/dir/Armada+D%C3%BC%C4%9F%C3%BCn+Ve+Kongre+Salonu,+Harput+Mahallesi,+5.+Sk.+No:17,+25070+Paland%C3%B6ken%2FErzurum/Armada+D%C3%BC%C4%9F%C3%BCn+Ve+Kongre+Salonu,+Harput+Mahallesi,+5.+Sk.+No:17,+25070+Paland%C3%B6ken%2FErzurum/@39.9373297,41.3578315,11.7z/data=!4m13!4m12!1m5!1m1!1s0x406e5ef3a39d4aff:0x32d2fe29f04edc56!2m2!1d41.2448973!2d39.8877113!1m5!1m1!1s0x406e5ef3a39d4aff:0x32d2fe29f04edc56!2m2!1d41.2448973!2d39.8877113?entry=ttu&g_ep=EgoyMDI2MTEwOS4wIKXMDSoASAFQAw%3D%3D',
        googleMapsEmbedUrl: 'https://www.google.com/maps?q=Armada%20D%C3%BC%C4%9F%C3%BCn%20Ve%20Kongre%20Salonu%2C%20Harput%20Mahallesi%2C%205.%20Sk.%20No%3A17%2C%2025070%20Paland%C3%B6ken%2FErzurum&output=embed',
        description: 'Test event',
        heroImage: 'https://example.com/test.jpg',
        coverAlt: 'Test cover',
      },
    },
  });

  const expectedDestination = encodeURIComponent(
    'Armada Düğün ve Kongre Salonu Harput Mahallesi, 5. Sk. No:17, 25070 Palandöken/Erzurum',
  );

  assert.equal(
    events[0].directionsUrl,
    `https://www.google.com/maps/dir/?api=1&destination=${expectedDestination}`,
  );
  assert.ok(!events[0].directionsUrl.includes('origin='));
});
