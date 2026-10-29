const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9246',
    '--window-size=1280,950',
    'about:blank'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2000));

    const targets = await new Promise(res => {
      http.get('http://localhost:9246/json', r => {
        let d = '';
        r.on('data', c => d += c);
        r.on('end', () => res(JSON.parse(d)));
      });
    });

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
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

    // 1. Mobile capture (390px width)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await new Promise(r => setTimeout(r, 2500));

    // Scroll directly to #our-bakes
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('our-bakes');
        if (el) {
          const rect = el.getBoundingClientRect();
          window.scrollTo(0, window.scrollY + rect.top);
        }
      })()`
    });
    await new Promise(r => setTimeout(r, 1500));

    const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('mobile_menu_compact.png', Buffer.from(mobileShot.data, 'base64'));
    console.log('Saved mobile_menu_compact.png');

    // 2. Desktop capture (1280px width)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('our-bakes');
        if (el) {
          const rect = el.getBoundingClientRect();
          window.scrollTo(0, window.scrollY + rect.top);
        }
      })()`
    });
    await new Promise(r => setTimeout(r, 1500));

    const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('desktop_menu_view.png', Buffer.from(desktopShot.data, 'base64'));
    console.log('Saved desktop_menu_view.png');

    ws.close();
  } finally {
    proc.kill();
  }
}

main().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
