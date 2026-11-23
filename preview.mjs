import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';

const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/interaction.js', ['interaction.js', 'text/javascript; charset=utf-8']],
  ['/portrait.png', ['portrait.png', 'image/png']],
]);

const port = Number(process.argv[2] ?? 4194);
createServer((request, response) => {
  const file = files.get(new URL(request.url, 'http://localhost').pathname);
  if (!file) {
    response.writeHead(404).end();
    return;
  }
  const [path, type] = file;
  response.setHeader('Content-Type', type);
  createReadStream(new URL(path, import.meta.url)).pipe(response);
}).listen(port, '127.0.0.1', () => console.log('http://127.0.0.1:' + port + '/'));

