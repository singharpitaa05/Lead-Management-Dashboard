// LEAD CONTROLLER

import Lead from '../models/Lead.js';

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, leadStatus, leadSource } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !company || !leadSource) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create lead with authenticated user ID
    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      leadStatus: leadStatus || 'New', // Default to 'New' if not provided
      leadSource,
      createdBy: req.user._id, // From auth middleware
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating lead',
      error: error.message,
    });
  }
};

// @desc    Get all leads with search, filter, sort, and pagination
// @route   GET /api/leads
// @access  Private
export const getLeads = async (req, res) => {
  try {
    // Extract query parameters
    const {
      search = '',
      status = '',
      source = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    // Build query object - start with user's leads only
    const query = { createdBy: req.user._id };

    // Search: by name, email, or company (case-insensitive)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by status
    if (status) {
      query.leadStatus = status;
    }

    // Filter by source
    if (source) {
      query.leadSource = source;
    }

    // Calculate pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const leads = await Lead.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const totalLeads = await Lead.countDocuments(query);
    const totalPages = Math.ceil(totalLeads / limitNum);

    res.status(200).json({
      success: true,
      count: leads.length,
      total: totalLeads,
      page: pageNum,
      totalPages,
      data: leads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leads',
      error: error.message,
    });
  }
};

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
// @access  Private
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      createdBy: req.user._id, // Ensure user can only access their own leads
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lead',
      error: error.message,
    });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
export const updateLead = async (req, res) => {
  try {
    const { name, email, phone, company, leadStatus, leadSource } = req.body;

    // Find lead
    let lead = await Lead.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    // Update fields
    lead.name = name || lead.name;
    lead.email = email || lead.email;
    lead.phone = phone || lead.phone;
    lead.company = company || lead.company;
    lead.leadStatus = leadStatus || lead.leadStatus;
    lead.leadSource = leadSource || lead.leadSource;

    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating lead',
      error: error.message,
    });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting lead',
      error: error.message,
    });
  }
};