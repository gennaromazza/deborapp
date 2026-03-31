const MAX_LONG_SIDE = 1080;
const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const INITIAL_QUALITY = 0.85;
const MIN_QUALITY = 0.5;
const QUALITY_STEP = 0.05;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Errore nel caricamento dell\'immagine'));
    };
    img.src = url;
  });
}

function calculateDimensions(img) {
  const { width, height } = img;
  const longSide = Math.max(width, height);
  if (longSide <= MAX_LONG_SIDE) {
    return { width, height };
  }
  const ratio = MAX_LONG_SIDE / longSide;
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

function compressToBlob(canvas, quality) {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob),
      'image/jpeg',
      quality
    );
  });
}

export async function processImage(file, onProgress) {
  onProgress?.(10, 'Caricamento immagine...');

  const img = await loadImage(file);
  onProgress?.(30, 'Ridimensionamento...');

  const { width, height } = calculateDimensions(img);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);

  onProgress?.(50, 'Compressione...');

  let quality = INITIAL_QUALITY;
  let blob = await compressToBlob(canvas, quality);

  while (blob.size > MAX_FILE_SIZE && quality > MIN_QUALITY) {
    quality -= QUALITY_STEP;
    blob = await compressToBlob(canvas, quality);
  }

  onProgress?.(90, 'Finalizzazione...');

  const previewUrl = URL.createObjectURL(blob);

  onProgress?.(100, 'Completato');

  return {
    blob,
    previewUrl,
    width,
    height,
    size: blob.size,
    originalSize: file.size,
    quality: Math.round(quality * 100),
    compressionRatio: Math.round((1 - blob.size / file.size) * 100),
  };
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
