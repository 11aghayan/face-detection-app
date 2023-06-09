import express from 'express';
const router = express.Router();
import {
  signin,
  register,
  getUser,
  updateEntries
} from '../controllers/controllers.js'


// Sign in route
router.post('/signin', signin);

// Register route
router.post('/register', register);

// Get user
router.get('/profile/:id', getUser);

// Update entries
router.put('/image', updateEntries);

export default router;