import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import articlesRouter from './routes/articles.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './db/mongodb.js';


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

app.use('/api/articles', articlesRouter);
app.use('/api/auth', authRouter);

async function startServer() {
  try {
    await connectToDatabase();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(
      `Backend startup failed (${error.name}). Check MONGODB_URI, Atlas network access, and database credentials.`
    );
    process.exitCode = 1;
  }
}

startServer();


