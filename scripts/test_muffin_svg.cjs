const fs = require('fs');

// Muffin silhouette path in 0..200 (width) x 0..240 (height)
// Beautiful scalloped muffin top dome + flared overhang + tapered wrapper base
const muffinPath200 = `
  M 52 225
  C 52 232, 65 235, 100 235
  C 135 235, 148 232, 148 225
  L 162 135
  C 172 135, 188 126, 192 108
  C 196 88, 182 66, 168 54
  C 160 32, 140 18, 122 18
  C 112 12, 100 12, 100 12
  C 100 12, 88 12, 78 18
  C 60 18, 40 32, 32 54
  C 18 66, 4 88, 8 108
  C 12 126, 28 135, 38 135
  Z
`.replace(/\s+/g, ' ').trim();

// Normalize to 0..1 coordinates for objectBoundingBox
// x / 200, y / 240
function normalizePath(svgPath, w, h) {
  return svgPath.replace(/([0-9.]+)\s+([0-9.]+)/g, (match, x, y) => {
    const nx = (parseFloat(x) / w).toFixed(4);
    const ny = (parseFloat(y) / h).toFixed(4);
    return `${nx} ${ny}`;
  });
}

const normPath = normalizePath(muffinPath200, 200, 240);
console.log('Normalized 0..1 path:', normPath);

const testHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    background: #2E1D16;
    margin: 0;
    padding: 60px;
    font-family: system-ui, sans-serif;
    color: #FDF9F3;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cluster {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 40px;
  }
  .muffin-wrapper {
    position: relative;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .muffin-wrapper:hover {
    transform: scale(1.08) !important;
    z-index: 40 !important;
  }
  .outline-back {
    position: absolute;
    inset: -6px;
    background: #F3E3D3;
    clip-path: url(#muffin-mask);
    -webkit-clip-path: url(#muffin-mask);
    opacity: 0.9;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
  }
  .muffin-content {
    position: relative;
    width: 100%;
    height: 100%;
    clip-path: url(#muffin-mask);
    -webkit-clip-path: url(#muffin-mask);
  }
  .muffin-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>
</head>
<body>
  <h2>Muffin Trio Cluster SVG Silhouette Test</h2>

  <svg width="0" height="0" style="position: absolute;">
    <defs>
      <clipPath id="muffin-mask" clipPathUnits="objectBoundingBox">
        <path d="${normPath}" />
      </clipPath>
    </defs>
  </svg>

  <div class="cluster" style="gap: -24px;">
    <!-- Left: Sourdough Bread -->
    <div class="muffin-wrapper" style="width: 190px; height: 230px; margin-right: -35px; transform: rotate(-4deg); z-index: 10;">
      <div class="outline-back"></div>
      <div class="muffin-content">
        <img src="file:///c:/KGFBakeHouse/src/assets/prod_multigrain_bread.jpg" />
      </div>
    </div>

    <!-- Center: Chocolate Cake (Bigger, Front) -->
    <div class="muffin-wrapper" style="width: 240px; height: 290px; transform: scale(1.04); z-index: 20;">
      <div class="outline-back" style="background: #C4733A; inset: -7px;"></div>
      <div class="muffin-content">
        <img src="file:///c:/KGFBakeHouse/src/assets/custom_cake_2.jpg" />
      </div>
    </div>

    <!-- Right: Cupcake / Muffin -->
    <div class="muffin-wrapper" style="width: 190px; height: 230px; margin-left: -35px; transform: rotate(4deg); z-index: 10;">
      <div class="outline-back"></div>
      <div class="muffin-content">
        <img src="file:///c:/KGFBakeHouse/src/assets/prod_cupcake.jpg" />
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('scripts/test_muffin_preview.html', testHtml);
fs.writeFileSync('scripts/muffin_norm_path.txt', normPath);
console.log('Created preview HTML');
