import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, role, opportunity, talent } = req.body;

  try {
    const newUser = new User({ name, email, password, role, opportunity, talent });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user ❌' });
  }
});

export default router;
