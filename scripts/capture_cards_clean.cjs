const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9226',
    '--window-size=1280,950',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await new Promise(res => {
    http.get('http://localhost:9226/json', r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    });
  });

  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const pending = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const fn = pending.get(msg.id);
      pending.delete(msg.id);
      fn(msg.result);
    }
  };

  function send(method, params = {}) {
    return new Promise(resolve => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  // 1. Desktop capture of the Marquee & 4 Cute Cards
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 950,
    deviceScaleFactor: 2,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 2500));

  // Scroll #trust-pillars into view
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('trust-pillars');
      if (el) {
        const rect = el.getBoundingClientRect();
        window.scrollBy(0, rect.top - 60);
      }
    })()`
  });
  await new Promise(r => setTimeout(r, 1200));

  const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
  const desktopPath = 'C:\\Users\\uma\\.gemini\\antigravity-ide\\brain\\6cdf4a5b-3cf8-4615-8905-1e943fab8b94\\cute_cards_desktop_showcase.png';
  fs.writeFileSync(desktopPath, Buffer.from(desktopShot.data, 'base64'));
  console.log('Saved cute_cards_desktop_showcase.png');

  // 2. Mobile capture of the 4 Cute Cards
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 2500));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('trust-pillars');
      if (el) {
        const rect = el.getBoundingClientRect();
        window.scrollBy(0, rect.top - 40);
      }
    })()`
  });
  await new Promise(r => setTimeout(r, 1200));

  const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
  const mobilePath = 'C:\\Users\\uma\\.gemini\\antigravity-ide\\brain\\6cdf4a5b-3cf8-4615-8905-1e943fab8b94\\cute_cards_mobile_showcase.png';
  fs.writeFileSync(mobilePath, Buffer.from(mobileShot.data, 'base64'));
  console.log('Saved cute_cards_mobile_showcase.png');

  ws.close();
  proc.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
