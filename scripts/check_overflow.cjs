const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function test() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--window-size=360,800',
    '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    '--remote-debugging-port=9228',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1600));

  const targets = await new Promise((res, rej) => {
    http.get('http://localhost:9228/json', r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to target:', pageTarget.title, pageTarget.url, pageTarget.type);
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const pending = new Map();
  const send = (m, p = {}) => new Promise((resolve, reject) => {
    const msgId = id++;
    pending.set(msgId, (res) => resolve(res));
    ws.send(JSON.stringify({ id: msgId, method: m, params: p }));
  });

  ws.onmessage = (event) => {
    const raw = typeof event.data === 'string' ? event.data : event.data.toString();
    const msg = JSON.parse(raw);
    if (msg.error) console.error('CDP Error for ID', msg.id, msg.error);
    if (msg.id && pending.has(msg.id)) {
      const resolver = pending.get(msg.id);
      pending.delete(msg.id);
      resolver(msg.result);
    }
  };

  console.log('Page.enable:', await send('Page.enable'));
  console.log('Runtime.enable:', await send('Runtime.enable'));
  const artifactDir = 'C:\\Users\\uma\\.gemini\\antigravity-ide\\brain\\6cdf4a5b-3cf8-4615-8905-1e943fab8b94';
  const viewports = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 414, height: 896 },
    { width: 428, height: 926 },
  ];

  // 1. Capture Story Section at 390px
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
  await new Promise(r => setTimeout(r, 1200));

  const storyShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${artifactDir}\\mobile_story_toggle.png`, Buffer.from(storyShot.data, 'base64'));
  console.log('Saved mobile_story_toggle.png');

  // 2. Capture Reviews Section at 390px
  await send('Runtime.evaluate', {
    expression: "document.getElementById('reviews')?.scrollIntoView({ block: 'start' });"
  });
  await new Promise(r => setTimeout(r, 1200));

  const reviewsShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${artifactDir}\\mobile_reviews_carousel.png`, Buffer.from(reviewsShot.data, 'base64'));
  console.log('Saved mobile_reviews_carousel.png');

  ws.close();
  chromeProc.kill();
  process.exit(0);
}

test().catch(e => { console.error(e); process.exit(1); });
