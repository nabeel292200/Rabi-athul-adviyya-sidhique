const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const filePath = path.join(__dirname, '..', 'public', 'images', 'rs_gold_wax_seal.png');
const data = fs.readFileSync(filePath);
const png = PNG.sync.read(data);

const width = png.width;
const height = png.height;

// Pass 1: Set any remaining pale/neutral/white pixels to transparent
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];
    const a = png.data[idx + 3];

    if (a === 0) continue;

    // Check if pale or neutral background
    const brightness = (r + g + b) / 3;
    const isPale = brightness > 205;
    const isNeutral = Math.abs(r - g) < 25 && Math.abs(r - b) < 35;

    // If it's light and not rich gold
    if (isPale && isNeutral) {
      png.data[idx + 3] = 0;
    }
  }
}

// Pass 2: Defringe outer boundary - any non-zero alpha pixel bordering an alpha=0 pixel
// if it has low saturation or brightness > 185, blend smoothly
for (let iter = 0; iter < 2; iter++) {
  const toZero = [];
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      if (png.data[idx + 3] === 0) continue;

      const r = png.data[idx];
      const g = png.data[idx + 1];
      const b = png.data[idx + 2];

      // Has transparent neighbor?
      const hasTransparentNeighbor =
        png.data[((y - 1) * width + x) * 4 + 3] === 0 ||
        png.data[((y + 1) * width + x) * 4 + 3] === 0 ||
        png.data[(y * width + (x - 1)) * 4 + 3] === 0 ||
        png.data[(y * width + (x + 1)) * 4 + 3] === 0;

      if (hasTransparentNeighbor) {
        const isNotGold = (r - b < 28) && (g - b < 24);
        if (isNotGold || (r + g + b) / 3 > 195) {
          toZero.push(idx);
        }
      }
    }
  }

  for (const idx of toZero) {
    png.data[idx + 3] = 0;
  }
}

const outBuf = PNG.sync.write(png);
fs.writeFileSync(filePath, outBuf);
console.log('Successfully defringed and cleaned transparent PNG.');
