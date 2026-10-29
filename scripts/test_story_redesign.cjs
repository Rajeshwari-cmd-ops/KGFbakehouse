const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function test() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--window-size=1280,800',
    '--remote-debugging-port=9229',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1600));

  const targets = await new Promise((res, rej) => {
    http.get('http://localhost:9229/json', r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const pending = new Map();
  const send = (m, p = {}) => new Promise((resolve) => {
    const msgId = id++;
    pending.set(msgId, (res) => resolve(res));
    ws.send(JSON.stringify({ id: msgId, method: m, params: p }));
  });

  ws.onmessage = (event) => {
    const raw = typeof event.data === 'string' ? event.data : event.data.toString();
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      const resolver = pending.get(msg.id);
      pending.delete(msg.id);
      resolver(msg.result);
    }
  };

  await send('Page.enable');
  await send('Runtime.enable');
  const artifactDir = 'C:\\Users\\uma\\.gemini\\antigravity-ide\\brain\\6cdf4a5b-3cf8-4615-8905-1e943fab8b94';

  // 1. Desktop Capture
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1.5,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 1500));
  await send('Runtime.evaluate', {
    expression: "document.getElementById('story')?.scrollIntoView({ block: 'start' });"
  });
  await new Promise(r => setTimeout(r, 1400));

  const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${artifactDir}\\desktop_story_redesign.png`, Buffer.from(desktopShot.data, 'base64'));
  console.log('Saved desktop_story_redesign.png');

  // 2. Mobile Capture at 390px
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 1500));
  await send('Runtime.evaluate', {
    expression: "document.getElementById('story')?.scrollIntoView({ block: 'start' });"
  });
  await new Promise(r => setTimeout(r, 1400));

  const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${artifactDir}\\mobile_story_redesign.png`, Buffer.from(mobileShot.data, 'base64'));
  console.log('Saved mobile_story_redesign.png');

  ws.close();
  chromeProc.kill();
  process.exit(0);
}

test().catch(e => { console.error(e); process.exit(1); });
