const fs = require('fs');

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 76" fill="none" style="height: 100%; width: auto; max-width: 100%; display: block;">
  <!-- Baker's Hat / House Outline Icon -->
  <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <!-- Outer Contour -->
    <path 
      d="M 20 66 
         L 58 66 
         C 63 66 66 63 66 58 
         L 66 44 
         C 66 40 69 36 73 34 
         C 77 31 77 25 73 21 
         C 69 17 62 17 58 20 
         C 54 13 45 9 37 11 
         C 29 13 25 19 24 25 
         C 17 23 10 27 8 34 
         C 6 41 11 45 15 45 
         L 15 58 
         C 15 63 18 66 20 66 Z" 
      stroke-width="3.2" 
      fill="none" 
    />

    <!-- Inner Contour (parallel outline) -->
    <path 
      d="M 24 61 
         L 54 61 
         C 57 61 59 59 59 56 
         L 59 44
         M 21 44
         L 21 56 
         C 21 59 23 61 24 61" 
      stroke-width="2.2" 
      fill="none" 
    />

    <!-- 4 Rounded Window Panes (House Motif) -->
    <rect x="31" y="47" width="5.5" height="5.5" rx="1.5" fill="currentColor" stroke="none" />
    <rect x="39.5" y="47" width="5.5" height="5.5" rx="1.5" fill="currentColor" stroke="none" />
    <rect x="31" y="55" width="5.5" height="5.5" rx="1.5" fill="currentColor" stroke="none" />
    <rect x="39.5" y="55" width="5.5" height="5.5" rx="1.5" fill="currentColor" stroke="none" />

    <!-- Circular Wheat-Free Ring on Right Puff -->
    <circle cx="58" cy="30" r="10.5" stroke-width="2.4" fill="none" />
    
    <!-- Diagonal Wheat Stalk -->
    <path d="M 51 37 L 65 23" stroke-width="1.8" />
    <!-- Wheat Grains -->
    <circle cx="56" cy="31" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="60" cy="27" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="62" cy="30" r="1.5" fill="currentColor" stroke="none" />
    
    <!-- Slash across wheat (Gluten-Free bar) -->
    <path d="M 49 23 L 67 37" stroke-width="2" />
  </g>

  <!-- Typography -->
  <!-- KGF (Bold geometric modern) -->
  <text 
    x="88" 
    y="38" 
    font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="38" 
    font-weight="900" 
    fill="currentColor" 
    letter-spacing="-0.5"
  >
    KGF
  </text>

  <!-- KAUR'S GLUTEN FREE (Small caps) -->
  <text 
    x="89.5" 
    y="52" 
    font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="8.5" 
    font-weight="700" 
    fill="currentColor" 
    letter-spacing="1.6"
  >
    KAUR'S GLUTEN FREE
  </text>

  <!-- BAKEHOUSE (Bold uppercase) -->
  <text 
    x="89.5" 
    y="66" 
    font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="13.5" 
    font-weight="900" 
    fill="currentColor" 
    letter-spacing="2"
  >
    BAKEHOUSE
  </text>
</svg>`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 40px; font-family: sans-serif; background: #D5C2AF; display: flex; flex-direction: column; gap: 30px; }
  .preview-card-light {
    background: #FDF9F3;
    color: #2E1D16;
    padding: 12px 28px;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  }
  .preview-card-dark {
    background: #1E120D;
    color: #FDF9F3;
    padding: 14px 32px;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }
</style>
</head>
<body>
  <div>
    <h3 style="color: #2E1D16; margin-bottom: 12px;">1. Navbar Light Background (Espresso Brown #2E1D16 single-color):</h3>
    <div class="preview-card-light">
      <div style="height: 42px; width: 145px;">
        ${logoSvg}
      </div>
    </div>
  </div>

  <div>
    <h3 style="color: #2E1D16; margin-bottom: 12px;">2. Footer Dark Background (Cream #FDF9F3 single-color):</h3>
    <div class="preview-card-dark">
      <div style="height: 50px; width: 172px;">
        ${logoSvg}
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('scripts/logo_preview.html', html);
fs.writeFileSync('src/assets/logo.svg', logoSvg);
console.log('Saved scripts/logo_preview.html & src/assets/logo.svg');
