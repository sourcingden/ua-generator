import http from 'http';

for (let port = 3000; port <= 3005; port++) {
  http.get(`http://localhost:${port}/`, (res) => {
    console.log(`Port ${port} is open, status: ${res.statusCode}`);
  }).on('error', () => {
    // console.log(`Port ${port} is closed`);
  });
}
