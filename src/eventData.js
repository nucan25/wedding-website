import weddingConfig from './config';

function getDirectionsUrl(venueName, venueAddress, fallbackUrl) {
  if (fallbackUrl && !fallbackUrl.startsWith('TODO')) {
    return fallbackUrl;
  }

  const query = [venueName, venueAddress].filter(Boolean).join(' ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getGoogleMapsEmbedUrl(venueName, venueAddress, fallbackUrl) {
  if (fallbackUrl && !fallbackUrl.startsWith('TODO')) {
    const query = [venueName, venueAddress].filter(Boolean).join(' ');
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  }

  const query = [venueName, venueAddress].filter(Boolean).join(' ');
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function getProgramEvents() {
  const events = weddingConfig.events ?? {};

  return Object.values(events).map((event) => ({
    id: event.id,
    title: event.title,
    date: new Date(event.date),
    venueName: event.venueName,
    venueAddress: event.venueAddress,
    directionsUrl: getDirectionsUrl(event.venueName, event.venueAddress, event.directionsUrl),
    googleMapsEmbedUrl: getGoogleMapsEmbedUrl(
      event.venueName,
      event.venueAddress,
      event.googleMapsEmbedUrl,
    ),
    description: event.description,
    heroImage: event.heroImage,
    coverAlt: event.coverAlt,
    timeText: new Date(event.date).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));
}
