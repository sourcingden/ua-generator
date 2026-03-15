import http from 'http';

http.get('http://localhost:3000/src/App.tsx', (res) => {
  console.log('App.tsx content-type:', res.headers['content-type']);
});
