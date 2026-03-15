import http from 'http';

http.get('http://localhost:3000/src/index.css', (res) => {
  console.log('index.css content-type:', res.headers['content-type']);
});
