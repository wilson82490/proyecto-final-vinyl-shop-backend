import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import vinylRouter from './src/routes/vinyl.router.js';
import cartRouter from './src/routes/cart.router.js';
import dashboardRouter from './src/routes/dashboard.router.js';
import authRouter from './src/routes/auth.router.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/vinyls", vinylRouter);
app.use("/api/cart", cartRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/auth", authRouter);


app.get('/', (req, res) => {
  res.json({message: 'Hello, Vinyl Shop!'});
});



app.listen(PORT, () => 
  console.log(`Server is running on  http://localhost:${PORT}`));
