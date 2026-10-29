const fs = require('fs');

// Muffin / Cupcake Silhouette Path in 0..1 coordinates (objectBoundingBox):
// - Scalloped rounded muffin dome on top with 5-6 soft flower-style lobes
// - Flared overhang at waist
// - Tapered cupcake wrapper base with rounded bottom

// Let's craft an exact, beautiful smooth bezier path:
// Starts at bottom-left base corner (0.22, 0.94)
// -> rounded bottom to (0.78, 0.94)
// -> right wrapper wall up to waist (0.84, 0.50)
// -> muffin-top overhang flares out to (0.94, 0.42)
// -> scalloped lobes over the dome:
//    - right lobe up to (0.86, 0.22)
//    - upper right lobe to (0.68, 0.08)
//    - center crown dome to (0.50, 0.04)
//    - upper left lobe to (0.32, 0.08)
//    - left lobe down to (0.14, 0.22)
//    - outer left overhang to (0.06, 0.42)
// -> waist tucks in to (0.16, 0.50)
// -> left wrapper wall down to (0.22, 0.94)

const muffinPath = `M 0.22 0.92
  C 0.22 0.96, 0.26 0.98, 0.32 0.98
  L 0.68 0.98
  C 0.74 0.98, 0.78 0.96, 0.78 0.92
  L 0.84 0.52
  C 0.88 0.52, 0.94 0.48, 0.96 0.40
  C 0.98 0.32, 0.92 0.24, 0.85 0.20
  C 0.82 0.12, 0.74 0.06, 0.65 0.06
  C 0.58 0.03, 0.52 0.03, 0.50 0.03
  C 0.48 0.03, 0.42 0.03, 0.35 0.06
  C 0.26 0.06, 0.18 0.12, 0.15 0.20
  C 0.08 0.24, 0.02 0.32, 0.04 0.40
  C 0.06 0.48, 0.12 0.52, 0.16 0.52
  Z`;

console.log('Muffin Path generated');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    padding: 60px;
    background: #2E1D16;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
  }
  .cluster-container {
    position: relative;
    width: 600px;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .muffin-card {
    position: absolute;
    transition: transform 0.3s ease;
  }
  .muffin-left {
    left: 20px;
    bottom: 30px;
    width: 210px;
    height: 250px;
    z-index: 10;
    transform: rotate(-6deg);
  }
  .muffin-center {
    left: 175px;
    top: 15px;
    width: 250px;
    height: 295px;
    z-index: 20;
    transform: scale(1.06);
  }
  .muffin-right {
    right: 20px;
    bottom: 30px;
    width: 210px;
    height: 250px;
    z-index: 10;
    transform: rotate(6deg);
  }
  .doily-border {
    position: absolute;
    inset: -6px;
    background: #F3E3D3;
    clip-path: url(#muffin-clip);
    opacity: 0.85;
  }
  .muffin-img-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    clip-path: url(#muffin-clip);
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  }
  .muffin-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
</head>
<body>
  <svg width="0" height="0" style="position: absolute;">
    <defs>
      <clipPath id="muffin-clip" clipPathUnits="objectBoundingBox">
        <path d="${muffinPath}" />
      </clipPath>
    </defs>
  </svg>

  <div class="cluster-container">
    <!-- Muffin 1: Left (Sourdough Bread) -->
    <div class="muffin-card muffin-left">
      <div class="doily-border"></div>
      <div class="muffin-img-wrap">
        <img class="muffin-img" src="http://localhost:5173/src/assets/menu/brown-bread-loaf.jpg" />
      </div>
    </div>

    <!-- Muffin 2: Center (Chocolate Cake - Bigger, Front) -->
    <div class="muffin-card muffin-center">
      <div class="doily-border" style="background: #C4733A;"></div>
      <div class="muffin-img-wrap">
        <img class="muffin-img" src="http://localhost:5173/src/assets/custom_cake_1.jpg" />
      </div>
    </div>

    <!-- Muffin 3: Right (Cupcake / Muffin) -->
    <div class="muffin-card muffin-right">
      <div class="doily-border"></div>
      <div class="muffin-img-wrap">
        <img class="muffin-img" src="http://localhost:5173/src/assets/menu/muffins-6pc.jpg" />
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('scripts/scratch_muffin_test.html', html);
