const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9224',
    '--window-size=1280,950',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://localhost:9224/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const wsUrl = targets[0].webSocketDebuggerUrl;
  console.log('Connected to CDP at:', wsUrl);

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

  // 1. Desktop Viewport
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 950,
    deviceScaleFactor: 2,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll down to the Trust Cards & Marquee section
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo({ top: 820, behavior: "instant" });'
  });
  await new Promise(r => setTimeout(r, 1000));

  const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
  const desktopPath = 'C:\\Users\\uma\\.gemini\\antigravity-ide\\brain\\6cdf4a5b-3cf8-4615-8905-1e943fab8b94\\cute_cards_desktop_view.png';
  fs.writeFileSync(desktopPath, Buffer.from(desktopShot.data, 'base64'));
  console.log('Saved cute_cards_desktop_view.png');

  // 2. Mobile Viewport (390 x 844)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll down to cards section on mobile
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo({ top: 950, behavior: "instant" });'
  });
  await new Promise(r => setTimeout(r, 1000));

  const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
  const mobilePath = 'C:\\Users\\uma\\.gemini\\antigravity-ide\\brain\\6cdf4a5b-3cf8-4615-8905-1e943fab8b94\\cute_cards_mobile_view.png';
  fs.writeFileSync(mobilePath, Buffer.from(mobileShot.data, 'base64'));
  console.log('Saved cute_cards_mobile_view.png');

  ws.close();
  chromeProc.kill();
  process.exit(0);
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
