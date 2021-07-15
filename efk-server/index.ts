import express from 'express';
import pool from './src/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('HELL YEAH');
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
  pool.connect();
});
