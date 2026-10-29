const fs = require('fs');

function genScallopedFlower(N = 8, R_cleft = 0.36, Rp = 0.15) {
  const angleStep = (2 * Math.PI) / N; // 45 deg
  let clefts = [];
  for (let k = 0; k < N; k++) {
    const angle = (k + 0.5) * angleStep;
    const x = +(0.5 + R_cleft * Math.cos(angle)).toFixed(4);
    const y = +(0.5 + R_cleft * Math.sin(angle)).toFixed(4);
    clefts.push({ x, y });
  }

  // Draw 8 rounded circular arcs from cleft to cleft
  let d = 'M ' + clefts[N - 1].x + ' ' + clefts[N - 1].y + ' ';
  for (let k = 0; k < N; k++) {
    d += 'A ' + Rp + ' ' + Rp + ' 0 0 1 ' + clefts[k].x + ' ' + clefts[k].y + ' ';
  }
  d += 'Z';
  return d;
}

const pathD = genScallopedFlower(8, 0.35, 0.155);
console.log('Path D:', pathD);

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { background: #FDF9F3; display: flex; gap: 60px; padding: 60px; font-family: sans-serif; align-items: center; justify-content: center; }
  .flower-container { position: relative; width: 190px; height: 190px; }
  .flower-doily {
    position: absolute;
    inset: -8px;
    background: #F3E3D3;
    clip-path: url(#flower-scallop-clip);
    transform: rotate(5deg);
  }
  .flower-img-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    clip-path: url(#flower-scallop-clip);
    background: #C4733A;
  }
</style>
</head>
<body>
  <svg width="0" height="0" style="position:absolute; pointer-events: none;">
    <defs>
      <clipPath id="flower-scallop-clip" clipPathUnits="objectBoundingBox">
        <path d="${pathD}" />
      </clipPath>
    </defs>
  </svg>

  <div style="text-align: center;">
    <div class="flower-container">
      <div class="flower-doily"></div>
      <div class="flower-img-wrap">
        <div style="width:100%; height:100%; background: linear-gradient(135deg, #C4733A, #8D471E); display:flex; align-items:center; justify-content:center; color:white; font-size:16px; font-weight:bold;">
          8 Petals
        </div>
      </div>
    </div>
    <p style="margin-top: 20px; font-weight: 600; color: #2E1D16;">Butter Cookies (250g)</p>
  </div>
</body>
</html>`;

fs.writeFileSync('scripts/scratch_flower_test.html', html);
