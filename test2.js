import http from 'http';

http.get('http://localhost:3000/src/data/names.ts', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
