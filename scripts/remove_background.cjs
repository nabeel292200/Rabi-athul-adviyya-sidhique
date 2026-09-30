const fs = require('fs');
const path = require('path');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const inputPath = path.join(__dirname, '..', 'public', 'images', 'rs_gold_wax_seal.jpg');
const outputPath = path.join(__dirname, '..', 'public', 'images', 'rs_gold_wax_seal.png');

console.log('Reading input image:', inputPath);
const jpegData = fs.readFileSync(inputPath);
const rawData = jpeg.decode(jpegData, { useTArray: true });

const width = rawData.width;
const height = rawData.height;
const centerX = width / 2;
const centerY = height / 2;

const png = new PNG({ width, height });

function getIdx(x, y) {
  return (y * width + x) * 4;
}

// Check if pixel is part of the gold wax seal
function isGoldWax(r, g, b, distFromCenter) {
  // Beyond 480px from center is definitely outside the seal
  if (distFromCenter > 480) return false;

  // Below 340px is definitely inside the seal
  if (distFromCenter < 340) return true;

  // Gold wax has distinct warm gold/amber tones:
  // 1. High contrast between red/green and blue (gold warmth)
  const rgDiff = Math.abs(r - g);
  const rbDiff = r - b;
  const gbDiff = g - b;
  const brightness = (r + g + b) / 3;

  // The background is pale off-white/cream/gray shadow:
  // If brightness is high (> 185) AND low color saturation (rbDiff < 38 and gbDiff < 32),
  // it is background or shadow on paper!
  if (brightness > 180 && rbDiff < 42 && gbDiff < 36) {
    return false;
  }

  // Pure neutral gray shadow
  if (rbDiff < 20 && gbDiff < 18) {
    return false;
  }

  // True gold rim has:
  // Either strong gold saturation: (rbDiff >= 42 || gbDiff >= 36)
  // Or rich dark/medium gold shading: (brightness <= 175 && r > b + 15)
  if (rbDiff >= 40 || gbDiff >= 32) return true;
  if (brightness < 170 && r > b) return true;

  return false;
}

// 1. Mark which pixels are definitely wax
const isWax = new Uint8Array(width * height);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = getIdx(x, y);
    const r = rawData.data[idx];
    const g = rawData.data[idx + 1];
    const b = rawData.data[idx + 2];
    const dist = Math.hypot(x - centerX, y - centerY);

    if (isGoldWax(r, g, b, dist)) {
      isWax[y * width + x] = 1;
    }
  }
}

// 2. Morphological smoothing: close small gaps and smooth edges
// Keep only the connected component around the center
const visited = new Uint8Array(width * height);
const queue = [Math.floor(centerX), Math.floor(centerY)];
visited[Math.floor(centerY) * width + Math.floor(centerX)] = 1;

let head = 0;
while (head < queue.length) {
  const cx = queue[head++];
  const cy = queue[head++];

  const neighbors = [
    [cx + 1, cy],
    [cx - 1, cy],
    [cx, cy + 1],
    [cx, cy - 1]
  ];

  for (const [nx, ny] of neighbors) {
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const pos = ny * width + nx;
      if (!visited[pos] && isWax[pos]) {
        visited[pos] = 1;
        queue.push(nx, ny);
      }
    }
  }
}

// 3. Build smooth alpha mask with soft anti-aliased edge
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = getIdx(x, y);
    const pos = y * width + x;

    png.data[idx] = rawData.data[idx];
    png.data[idx + 1] = rawData.data[idx + 1];
    png.data[idx + 2] = rawData.data[idx + 2];

    if (visited[pos]) {
      // Check distance to boundary for anti-aliasing
      let emptyNeighbors = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height || !visited[ny * width + nx]) {
            emptyNeighbors++;
          }
        }
      }

      if (emptyNeighbors > 14) {
        png.data[idx + 3] = Math.floor(255 * (1 - emptyNeighbors / 25));
      } else {
        png.data[idx + 3] = 255;
      }
    } else {
      // Check if very close to edge to provide 1px smooth border
      let filledNeighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height && visited[ny * width + nx]) {
            filledNeighbors++;
          }
        }
      }

      if (filledNeighbors >= 3) {
        png.data[idx + 3] = Math.floor(255 * (filledNeighbors / 9) * 0.45);
      } else {
        png.data[idx + 3] = 0;
      }
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync(outputPath, buffer);
console.log('Successfully written clean transparent PNG to:', outputPath);
