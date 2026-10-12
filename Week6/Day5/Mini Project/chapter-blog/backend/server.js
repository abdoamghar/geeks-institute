import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import articlesRouter from './routes/articles.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';


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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



