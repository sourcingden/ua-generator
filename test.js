import http from 'http';

http.get('http://localhost:3000/src/main.tsx', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  res.on('data', (chunk) => {
    console.log('Body:', chunk.toString().slice(0, 100));
  });
}).on('error', (e) => {
  console.error(e);
});
