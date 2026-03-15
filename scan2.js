import http from 'http';

for (let port = 3000; port <= 3003; port++) {
  http.get(`http://localhost:${port}/src/main.tsx`, (res) => {
    console.log(`Port ${port} content-type: ${res.headers['content-type']}`);
  }).on('error', () => {});
}
