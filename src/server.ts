import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  return res.send('Hello');
});

app.listen(3333, () => {
  console.log('Server running on http://localhost:3333');
});
