// ANALYTICS ROUTES

import express from 'express';
import { getDashboardAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All analytics routes require authentication
router.use(protect);

// Get dashboard analytics
router.get('/dashboard', getDashboardAnalytics);

export default router;