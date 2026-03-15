import http from 'http';

http.get('http://localhost:3000/src/does-not-exist.tsx', (res) => {
  console.log('404 content-type:', res.headers['content-type']);
  console.log('Status:', res.statusCode);
});
