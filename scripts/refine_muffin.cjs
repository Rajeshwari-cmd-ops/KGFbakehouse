const fs = require('fs');

// Refined Cute Bakery Muffin Shape:
// Dome: 55% of height, rounded scalloped muffin top
// Base: 38% of height, gently tapered cupcake wrapper with rounded bottom
const muffinPath = `M 0.20 0.94
  C 0.20 0.97, 0.25 0.98, 0.30 0.98
  L 0.70 0.98
  C 0.75 0.98, 0.80 0.97, 0.80 0.94
  L 0.86 0.56
  C 0.91 0.56, 0.97 0.50, 0.98 0.42
  C 0.99 0.32, 0.92 0.24, 0.85 0.20
  C 0.81 0.11, 0.73 0.05, 0.64 0.05
  C 0.57 0.02, 0.52 0.02, 0.50 0.02
  C 0.48 0.02, 0.43 0.02, 0.36 0.05
  C 0.27 0.05, 0.19 0.11, 0.15 0.20
  C 0.08 0.24, 0.01 0.32, 0.02 0.42
  C 0.03 0.50, 0.09 0.56, 0.14 0.56
  Z`;

console.log('Refined Muffin Path:', muffinPath);

// Save directly to a clipPath in FlowerDefs.jsx or Hero component
fs.writeFileSync('scripts/muffin_path.txt', muffinPath);
