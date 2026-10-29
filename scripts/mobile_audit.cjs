const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function audit() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9225',
    '--window-size=1000,1000',
    'about:blank'
  ]);

  // Wait 1.8s for Edge to start
  await new Promise(r => setTimeout(r, 1800));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://localhost:9225/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const wsUrl = targets[0].webSocketDebuggerUrl;
  const ws = new WebSocket(wsUrl);

  await new Promise(res => ws.onopen = res);

  let id = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const raw = typeof event.data === 'string' ? event.data : event.data.toString();
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      const resolver = pending.get(msg.id);
      pending.delete(msg.id);
      resolver(msg.result);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  const artifactDir = 'C:\\Users\\uma\\.gemini\\antigravity-ide\\brain\\6cdf4a5b-3cf8-4615-8905-1e943fab8b94';

  const viewports = [
    { width: 360, height: 800, name: '360' },
    { width: 390, height: 844, name: '390' },
    { width: 414, height: 896, name: '414' },
    { width: 428, height: 926, name: '428' },
  ];

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: true
    });

    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await new Promise(r => setTimeout(r, 1500));

    // Check for horizontal scroll
    const overflowCheck = await send('Runtime.evaluate', {
      expression: '({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth })',
      returnByValue: true
    });
    console.log(`Viewport ${vp.width}px overflow check:`, overflowCheck.result.value);

    // Capture Hero Top
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0);' });
    await new Promise(r => setTimeout(r, 600));
    const heroShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${artifactDir}\\mobile_${vp.name}_hero.png`, Buffer.from(heroShot.data, 'base64'));

    if (vp.width === 360) {
      // Capture Our Bakes on 360px
      await send('Runtime.evaluate', { expression: 'document.getElementById("our-bakes")?.scrollIntoView();' });
      await new Promise(r => setTimeout(r, 600));
      const bakesShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\mobile_360_bakes.png`, Buffer.from(bakesShot.data, 'base64'));
    }

    if (vp.width === 390) {
      // Capture Story Section on 390px
      await send('Runtime.evaluate', { expression: 'document.getElementById("story")?.scrollIntoView();' });
      await new Promise(r => setTimeout(r, 600));
      const storyShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\mobile_390_story.png`, Buffer.from(storyShot.data, 'base64'));
    }

    if (vp.width === 428) {
      // Capture Reviews Section on 428px
      await send('Runtime.evaluate', { expression: 'document.getElementById("reviews")?.scrollIntoView();' });
      await new Promise(r => setTimeout(r, 600));
      const reviewsShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}\\mobile_428_reviews.png`, Buffer.from(reviewsShot.data, 'base64'));
    }
  }

  console.log('Mobile audit complete.');
  ws.close();
  chromeProc.kill();
  process.exit(0);
}

audit().catch(err => {
  console.error(err);
  process.exit(1);
});
