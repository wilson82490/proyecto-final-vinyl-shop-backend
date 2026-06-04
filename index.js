import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/config/db.js';
connectDB();

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({message: 'Hello, Vinyl Shop!'});
});

app.listen(PORT, () => 
  console.log(`Server is running on  http://localhost:${PORT}`));
