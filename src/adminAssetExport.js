const DATA_URL_IMAGE_PATTERN = /^data:image\//i;

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'asset';
}

function getImageExtension(dataUrl) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);/i);
  if (!match) return 'png';

  const mimeType = match[1].toLowerCase();
  if (mimeType.includes('svg')) return 'svg';
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'jpg';
  if (mimeType.includes('webp')) return 'webp';
  if (mimeType.includes('gif')) return 'gif';
  if (mimeType.includes('png')) return 'png';

  return mimeType.split('/')[1] || 'png';
}

function ensureUniqueFileName(baseName, extension, usedNames) {
  const rawName = `${slugify(baseName)}.${extension}`;
  if (!usedNames.has(rawName)) {
    usedNames.add(rawName);
    return rawName;
  }

  let i = 2;
  while (usedNames.has(`${slugify(baseName)}-${i}.${extension}`)) {
    i += 1;
  }

  const nextName = `${slugify(baseName)}-${i}.${extension}`;
  usedNames.add(nextName);
  return nextName;
}

export function normalizeImageGallery(images = []) {
  if (!Array.isArray(images)) {
    return [];
  }

  return images.filter((image) => typeof image === 'string' && image.trim().length > 0);
}

export function collectProjectAssetEntries(config = {}) {
  const entries = [];
  const seen = new Set();
  const usedNames = new Set();

  const addAsset = (value, baseName) => {
    if (!value || typeof value !== 'string' || !DATA_URL_IMAGE_PATTERN.test(value)) {
      return;
    }

    if (seen.has(value)) {
      return;
    }

    seen.add(value);

    const extension = getImageExtension(value);
    const fileName = ensureUniqueFileName(baseName, extension, usedNames);

    entries.push({
      key: baseName,
      fileName,
      path: `public/uploads/${fileName}`,
      dataUrl: value,
    });
  };

  addAsset(config.heroImage, 'hero');

  Object.entries(config.events ?? {}).forEach(([eventId, event]) => {
    addAsset(event?.heroImage, `${eventId}-hero`);
  });

  Object.entries(config.storyByEvent ?? {}).forEach(([eventId, story]) => {
    (story?.items ?? []).forEach((item, index) => {
      addAsset(item?.image, `${eventId}-story-${index + 1}`);
    });
  });

  (config.imageGallery ?? []).forEach((image, index) => {
    addAsset(image, `gallery-${index + 1}`);
  });

  return entries;
}

export function buildProjectAssetManifest(config = {}) {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    assets: collectProjectAssetEntries(config),
  };
}

export function createProjectAssetFileName(fileName, fallback = 'asset') {
  const safeBase = (fileName || fallback)
    .trim()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || fallback;

  const extension = (fileName || '').includes('.')
    ? String(fileName.split('.').pop()).toLowerCase()
    : 'png';

  return `${slugify(safeBase)}.${extension}`;
}

export async function persistAssetToProjectDirectory(file, directoryName = 'uploads', baseName = 'asset') {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!('showDirectoryPicker' in window)) {
    throw new Error('Directory picker is not supported in this browser.');
  }

  const root = window.__weddingProjectRoot ?? (await window.showDirectoryPicker({ mode: 'readwrite' }));
  window.__weddingProjectRoot = root;

  const publicDirectory = await root.getDirectoryHandle('public', { create: true });
  const targetDirectory = await publicDirectory.getDirectoryHandle(directoryName, { create: true });

  const finalFileName = createProjectAssetFileName(
    file?.name || `${baseName}.png`,
    baseName,
  );

  const fileHandle = await targetDirectory.getFileHandle(finalFileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(file);
  await writable.close();

  return `/${directoryName}/${finalFileName}`;
}

export async function persistProjectConfigToDirectory(payload, fileName = 'admin-content.json') {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!('showDirectoryPicker' in window)) {
    throw new Error('Directory picker is not supported in this browser.');
  }

  const root = window.__weddingProjectRoot ?? (await window.showDirectoryPicker({ mode: 'readwrite' }));
  window.__weddingProjectRoot = root;

  const publicDirectory = await root.getDirectoryHandle('public', { create: true });
  const fileHandle = await publicDirectory.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });

  await writable.write(blob);
  await writable.close();

  return `/${fileName}`;
}

function dataUrlToBlob(dataUrl) {
  const [header, base64Data] = dataUrl.split(',');
  const mimeType = header.match(/^data:(.*?);base64$/)?.[1] || 'image/png';
  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType });
}

export function downloadProjectAssetManifest(config = {}, fileName = 'wedding-admin-assets.json') {
  if (typeof document === 'undefined') {
    return;
  }

  const manifest = buildProjectAssetManifest(config);
  const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function exportProjectAssetsToSelectedDirectory(config = {}, directoryHandle) {
  if (!directoryHandle || typeof window === 'undefined') {
    return false;
  }

  try {
    const publicDirectory = await directoryHandle.getDirectoryHandle('public', { create: true });
    const uploadsDirectory = await publicDirectory.getDirectoryHandle('uploads', { create: true });

    for (const asset of collectProjectAssetEntries(config)) {
      const fileHandle = await uploadsDirectory.getFileHandle(asset.fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(dataUrlToBlob(asset.dataUrl));
      await writable.close();
    }

    return true;
  } catch (error) {
    console.error('Project asset export failed:', error);
    return false;
  }
}
