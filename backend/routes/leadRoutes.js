import express from 'express';
import {
    createLead,
    deleteLead,
    getLeadById,
    getLeads,
    updateLead,
} from '../controllers/leadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All lead routes require authentication
router.use(protect);

// CRUD routes
router.post('/', createLead); // Create new lead
router.get('/', getLeads); // Get all leads (with filters in Phase 3)
router.get('/:id', getLeadById); // Get single lead by ID
router.put('/:id', updateLead); // Update lead
router.delete('/:id', deleteLead); // Delete lead

export default router;