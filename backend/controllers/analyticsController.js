// ANALYTICS CONTROLLER

// ANALYTICS CONTROLLER

import Lead from '../models/Lead.js';

// @desc    Get analytics data for dashboard
// @route   GET /api/analytics/dashboard
// @access  Private
export const getDashboardAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total leads count
    const totalLeads = await Lead.countDocuments({ createdBy: userId });

    // Leads by status aggregation
    const leadsByStatus = await Lead.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: '$leadStatus', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Format leads by status for frontend
    const statusData = leadsByStatus.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    // Leads by source aggregation
    const leadsBySource = await Lead.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: '$leadSource', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Format leads by source for frontend
    const sourceData = leadsBySource.map((item) => ({
      source: item._id,
      count: item.count,
    }));

    // Recent leads (last 30 days) trend
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const leadsTrend = await Lead.aggregate([
      {
        $match: {
          createdBy: userId,
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format trend data
    const trendData = leadsTrend.map((item) => ({
      date: item._id,
      count: item.count,
    }));

    // Conversion rate calculation
    const convertedLeads = await Lead.countDocuments({
      createdBy: userId,
      leadStatus: 'Converted',
    });
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

    // Calculate individual status counts
    const newLeads = await Lead.countDocuments({ createdBy: userId, leadStatus: 'New' });
    const contactedLeads = await Lead.countDocuments({ createdBy: userId, leadStatus: 'Contacted' });
    const qualifiedLeads = await Lead.countDocuments({ createdBy: userId, leadStatus: 'Qualified' });
    const lostLeads = await Lead.countDocuments({ createdBy: userId, leadStatus: 'Lost' });

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        convertedLeads,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        lostLeads,
        conversionRate: parseFloat(conversionRate),
        leadsByStatus: statusData,
        leadsBySource: sourceData,
        leadsTrend: trendData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics',
      error: error.message,
    });
  }
};