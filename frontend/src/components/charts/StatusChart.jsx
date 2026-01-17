// STATUS CHART COMPONENTS

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const StatusChart = ({ data }) => {
  // Colors for each status
  const COLORS = {
    New: '#3b82f6',
    Contacted: '#eab308',
    Qualified: '#a855f7',
    Converted: '#22c55e',
    Lost: '#ef4444',
  };

  // Transform data for recharts
  const chartData = data.map((item) => ({
    name: item.status,
    value: item.count,
    color: COLORS[item.status] || '#6b7280',
  }));

  // Custom label
  const renderLabel = (entry) => {
    return `${entry.name}: ${entry.value}`;
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No status data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;