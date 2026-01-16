// LEAD MODEL

import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide lead name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide lead email'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    leadStatus: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
      default: 'New',
    },
    leadSource: {
      type: String,
      enum: ['Website', 'Referral', 'Ads', 'Email'],
      required: [true, 'Please provide lead source'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Index for faster queries
leadSchema.index({ name: 1, email: 1, company: 1 });
leadSchema.index({ leadStatus: 1, leadSource: 1 });
leadSchema.index({ createdAt: -1 }); // For sorting by date

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;