const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 1. Desktop viewport (1280 x 850)
  await page.setViewport({ width: 1280, height: 850, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500)); // wait for animations and fonts

  const heroDesktopPath = path.resolve('hero_cluster_desktop.png');
  // Capture hero section area
  const heroElement = await page.$('section');
  if (heroElement) {
    await heroElement.screenshot({ path: heroDesktopPath });
  } else {
    await page.screenshot({ path: heroDesktopPath, clip: { x: 0, y: 0, width: 1280, height: 800 } });
  }
  console.log('Desktop hero saved to:', heroDesktopPath);

  // 2. Mobile viewport (390 x 844 - iPhone 14)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  const heroMobilePath = path.resolve('hero_cluster_mobile.png');
  const heroMobileEl = await page.$('section');
  if (heroMobileEl) {
    await heroMobileEl.screenshot({ path: heroMobilePath });
  } else {
    await page.screenshot({ path: heroMobilePath, clip: { x: 0, y: 0, width: 390, height: 800 } });
  }
  console.log('Mobile hero saved to:', heroMobilePath);

  await browser.close();
})();
