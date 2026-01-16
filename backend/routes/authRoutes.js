// AUTHENTICATION ROUTES

import express from 'express';
import { getMe, login, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register); // Register new user
router.post('/login', login); // Login user

// Protected routes
router.get('/me', protect, getMe); // Get current user (requires authentication)

export default router;