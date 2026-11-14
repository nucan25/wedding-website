import test from 'node:test';
import assert from 'node:assert/strict';

import { collectProjectAssetEntries, buildProjectAssetManifest } from './adminAssetExport.js';

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
