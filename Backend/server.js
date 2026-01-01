import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';

const app = express();

// Configure environment
dotenv.config();

// Database config
connectDB();

// Middlewares
app.use(cookieParser()); 
app.use(express.json()); // parse JSON bodyapp.use(express.json()); // parse JSON body

// Routes
app.use('/api/auth', authRoutes);
app.use("/leaves", leaveRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Employee Leave Management System",
  });
});

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode`.bgCyan.white);
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});