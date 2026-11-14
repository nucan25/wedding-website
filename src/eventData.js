function normalizeDirectionsUrl(url, query) {
  if (!url || url.startsWith('TODO')) {
    return null;
  }

  try {
    const parsed = new URL(url);
    const destination = parsed.searchParams.get('destination') || parsed.searchParams.get('query');

    if (destination) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    }
  } catch {
    // Ignore invalid URLs and fall back to the canonical destination route below.
  }

  return null;
}

function getDirectionsUrl(venueName, venueAddress, fallbackUrl) {
  const query = [venueName, venueAddress].filter(Boolean).join(' ');
  const normalizedFallback = normalizeDirectionsUrl(fallbackUrl, query);

  if (normalizedFallback) {
    return normalizedFallback;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

function getGoogleMapsEmbedUrl(venueName, venueAddress, fallbackUrl) {
  if (fallbackUrl && !fallbackUrl.startsWith('TODO')) {
    const query = [venueName, venueAddress].filter(Boolean).join(' ');
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  }

  const query = [venueName, venueAddress].filter(Boolean).join(' ');
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function getProgramEvents(config = {}) {
  const events = config.events ?? {};

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
