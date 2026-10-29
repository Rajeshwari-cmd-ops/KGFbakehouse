const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const proc = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  '--remote-debugging-port=9225',
  'about:blank'
]);

setTimeout(async () => {
  http.get('http://localhost:9225/json', res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      const targets = JSON.parse(d);
      const wsUrl = targets[0].webSocketDebuggerUrl;
      console.log('WS:', wsUrl);
      const ws = new WebSocket(wsUrl);
      ws.onopen = () => {
        console.log('OPEN');
        ws.send(JSON.stringify({ id: 1, method: 'Browser.getVersion' }));
      };
      ws.onmessage = (e) => {
        console.log('MSG:', e.data);
        ws.close();
        proc.kill();
        process.exit(0);
      };
      ws.onerror = (err) => console.log('ERR:', err);
    });
  });
}, 1500);
