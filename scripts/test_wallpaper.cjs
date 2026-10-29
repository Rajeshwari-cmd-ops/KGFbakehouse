const fs = require('fs');

const svgPattern = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- 1. Little 5-Petal Flower Outline (Top Left) -->
  <g transform="translate(25, 25)" stroke="#C4733A" stroke-width="1.1" stroke-opacity="0.13" fill="none">
    <circle cx="0" cy="0" r="2.2" />
    <circle cx="0" cy="-4.5" r="1.8" />
    <circle cx="4.3" cy="-1.4" r="1.8" />
    <circle cx="2.6" cy="3.6" r="1.8" />
    <circle cx="-2.6" cy="3.6" r="1.8" />
    <circle cx="-4.3" cy="-1.4" r="1.8" />
  </g>

  <!-- 2. Wheat Ear Outline (Top Right) -->
  <g transform="translate(75, 25)" stroke="#C4733A" stroke-width="1.1" stroke-opacity="0.13" fill="none" stroke-linecap="round">
    <line x1="0" y1="12" x2="0" y2="-10" />
    <path d="M0 -6 C-3 -9, -5 -6, -2 -3 C0 -4, 0 -6, 0 -6" />
    <path d="M0 -6 C3 -9, 5 -6, 2 -3 C0 -4, 0 -6, 0 -6" />
    <path d="M0 0 C-3 -3, -5 0, -2 3 C0 2, 0 0, 0 0" />
    <path d="M0 0 C3 -3, 5 0, 2 3 C0 2, 0 0, 0 0" />
    <path d="M0 6 C-3 3, -5 6, -2 9 C0 8, 0 6, 0 6" />
    <path d="M0 6 C3 3, 5 6, 2 9 C0 8, 0 6, 0 6" />
  </g>

  <!-- 3. Cupcake / Muffin Silhouette Outline (Bottom Left) -->
  <g transform="translate(25, 75)" stroke="#C4733A" stroke-width="1.1" stroke-opacity="0.13" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-6 2 L-4 9 C-4 10, 4 10, 4 9 L6 2" />
    <path d="M-7 2 C-8 -2, -3 -6, 0 -6 C3 -6, 8 -2, 7 2" />
    <circle cx="0" cy="-8" r="1" fill="#C4733A" fill-opacity="0.14" stroke="none" />
  </g>

  <!-- 4. Subtle Bakery Flour Spark / Star (Bottom Right) -->
  <g transform="translate(75, 75)" fill="#C4733A" fill-opacity="0.11">
    <path d="M0 -4 Q0 0 4 0 Q0 0 0 4 Q0 0 -4 0 Q0 0 0 -4 Z" />
  </g>
</svg>`;

const encoded = `data:image/svg+xml,${encodeURIComponent(svgPattern.replace(/\n\s*/g, ''))}`;

const testHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    padding: 60px;
    background-color: #FDF9F3;
    font-family: system-ui, sans-serif;
    color: #2E1D16;
  }
  .pattern-bg {
    position: relative;
    width: 800px;
    height: 500px;
    margin: 0 auto;
    border-radius: 24px;
    overflow: hidden;
    background-color: #FDF9F3;
    border: 1px solid #E7D2BF;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  .wallpaper {
    position: absolute;
    inset: 0;
    background-image: url("${encoded}");
    background-repeat: repeat;
    background-size: 100px 100px;
    pointer-events: none;
  }
  .blob-1 {
    position: absolute;
    top: -60px;
    left: -60px;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: rgba(243, 227, 211, 0.65);
    filter: blur(50px);
    pointer-events: none;
  }
  .blob-2 {
    position: absolute;
    top: 20px;
    right: -50px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: rgba(196, 115, 58, 0.08);
    filter: blur(50px);
    pointer-events: none;
  }
  .blob-3 {
    position: absolute;
    bottom: -60px;
    left: 40px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: rgba(125, 140, 111, 0.08);
    filter: blur(55px);
    pointer-events: none;
  }
  .content {
    position: relative;
    z-index: 10;
    padding: 40px;
    text-align: center;
  }
  .heading-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
  .flower-icon {
    width: 22px;
    height: 22px;
    fill: #C4733A;
  }
  h2 {
    font-family: Georgia, serif;
    font-size: 38px;
    margin: 0;
  }
  .card-sample {
    display: inline-block;
    background: #F3E3D3;
    padding: 24px 32px;
    border-radius: 28px;
    margin-top: 30px;
    box-shadow: 0 8px 24px rgba(46,29,22,0.05);
  }
</style>
</head>
<body>
  <div class="pattern-bg">
    <!-- Blobs in corners -->
    <div class="blob-1"></div>
    <div class="blob-2"></div>
    <div class="blob-3"></div>

    <!-- Repeating subtle wallpaper -->
    <div class="wallpaper"></div>

    <!-- Content -->
    <div class="content">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #7D8C6F; font-weight: 600; margin-bottom: 8px;">
        Freshly Baked To Pre-Order
      </div>

      <div class="heading-wrap">
        <svg class="flower-icon" viewBox="0 0 24 24">
          <path d="M12 2a3 3 0 0 0-3 3c0 .3.05.6.14.86A3 3 0 0 0 6 9a3 3 0 0 0 .86 2.14A3 3 0 0 0 6 15a3 3 0 0 0 3.14 2.86A3 3 0 0 0 12 22a3 3 0 0 0 2.86-4.14A3 3 0 0 0 18 15a3 3 0 0 0-.86-3.86A3 3 0 0 0 18 9a3 3 0 0 0-3.14-2.86A3 3 0 0 0 12 2zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
        </svg>
        <h2>Our Bakes</h2>
        <svg class="flower-icon" viewBox="0 0 24 24">
          <path d="M12 2a3 3 0 0 0-3 3c0 .3.05.6.14.86A3 3 0 0 0 6 9a3 3 0 0 0 .86 2.14A3 3 0 0 0 6 15a3 3 0 0 0 3.14 2.86A3 3 0 0 0 12 22a3 3 0 0 0 2.86-4.14A3 3 0 0 0 18 15a3 3 0 0 0-.86-3.86A3 3 0 0 0 18 9a3 3 0 0 0-3.14-2.86A3 3 0 0 0 12 2zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
        </svg>
      </div>

      <p style="max-width: 480px; margin: 16px auto; font-size: 13px; color: rgba(46,29,22,0.75); line-height: 1.6;">
        Explore our handcrafted gluten-free bakery items — prepared in a dedicated wheat-free kitchen with certified organic flours and pure dairy butter.
      </p>

      <div class="card-sample">
        <strong>Card Sits Cleanly On Top</strong>
        <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.8;">Zero clutter, elegant bakery wallpaper charm</p>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('scripts/pattern_preview.html', testHtml);
fs.writeFileSync('scripts/wallpaper_svg_uri.txt', encoded);
console.log('Created pattern preview and URI');
