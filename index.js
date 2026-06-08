import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import vinylRouter from './src/routes/vinyl.router.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/vinyls", vinylRouter);


app.get('/', (req, res) => {
  res.json({message: 'Hello, Vinyl Shop!'});
});



app.listen(PORT, () => 
  console.log(`Server is running on  http://localhost:${PORT}`));
