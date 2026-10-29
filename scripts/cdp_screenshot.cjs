const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9226',
    '--window-size=400,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1600));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://localhost:9226/json', (res) => {
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

  // 1. Viewport 360 x 800 - Hero & Muffin Trio
  await send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 800,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 2000));

  const shot360 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${artifactDir}\\audit_360_hero.png`, Buffer.from(shot360.data, 'base64'));
  console.log('Saved audit_360_hero.png');

  // Check horizontal overflow on 360px
  const res360 = await send('Runtime.evaluate', {
    expression: '({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth })',
    returnByValue: true
  });
  console.log('360px scroll dims:', res360.result.value);

  // 2. Viewport 390 x 844 - Scroll to Story section
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Runtime.evaluate', {
    expression: "document.getElementById('story')?.scrollIntoView({ block: 'start' });"
  });
  await new Promise(r => setTimeout(r, 1200));

  const shot390 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${artifactDir}\\audit_390_story.png`, Buffer.from(shot390.data, 'base64'));
  console.log('Saved audit_390_story.png');

  // 3. Viewport 414 x 896 - Scroll to Our Bakes
  await send('Emulation.setDeviceMetricsOverride', {
    width: 414,
    height: 896,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Runtime.evaluate', {
    expression: "document.getElementById('our-bakes')?.scrollIntoView({ block: 'start' });"
  });
  await new Promise(r => setTimeout(r, 1200));

  const shot414 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${artifactDir}\\audit_414_bakes.png`, Buffer.from(shot414.data, 'base64'));
  console.log('Saved audit_414_bakes.png');

  // 4. Viewport 428 x 926 - Scroll to Real Reviews
  await send('Emulation.setDeviceMetricsOverride', {
    width: 428,
    height: 926,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Runtime.evaluate', {
    expression: "document.getElementById('reviews')?.scrollIntoView({ block: 'center' });"
  });
  await new Promise(r => setTimeout(r, 1200));

  const shot428 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${artifactDir}\\audit_428_reviews.png`, Buffer.from(shot428.data, 'base64'));
  console.log('Saved audit_428_reviews.png');

  ws.close();
  chromeProc.kill();
  process.exit(0);
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
