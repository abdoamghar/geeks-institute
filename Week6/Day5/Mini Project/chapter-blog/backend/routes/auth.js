import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth.js';
import { getDatabase } from '../db/mongodb.js';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const account = await getDatabase()
    .collection('accounts')
    .findOne({ email });

  if (!account) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatches = await bcrypt.compare(password, account.password);

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { email: account.email, role: account.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api',
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: 'Login successful',
    user: {
      name: account.name,
      role: account.role,
    },
  });
});

router.get('/me', authenticateToken, async (req, res) => {
  const account = await getDatabase()
    .collection('accounts')
    .findOne({ email: req.user.email });

  if (!account) {
    return res.status(401).json({ message: 'Account not found' });
  }

  return res.status(200).json({
    user: {
      name: account.name,
      role: account.role,
    },
  });
});

router.post('/logout', (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  };

  for (const path of ['/api', '/api/auth', '/']) {
    res.clearCookie('token', { ...cookieOptions, path });
  }

  return res.status(200).json({ message: 'Logged out' });
});

export default router;