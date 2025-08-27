import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DashboardCharts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Test Categories Distribution
  const testCategoriesData = [
    { name: 'Blood Tests', value: 35, color: '#ef4444' },
    { name: 'Diabetes Tests', value: 20, color: '#f97316' },
    { name: 'Thyroid Tests', value: 15, color: '#eab308' },
    { name: 'Vitamin Tests', value: 12, color: '#22c55e' },
    { name: 'Hormone Tests', value: 10, color: '#3b82f6' },
    { name: 'Other Tests', value: 8, color: '#8b5cf6' }
  ];

  // Revenue by Test Type
  const revenueData = [
    { name: 'Blood Tests', value: 45, color: '#ef4444' },
    { name: 'Comprehensive Packages', value: 30, color: '#f97316' },
    { name: 'Specialized Tests', value: 15, color: '#eab308' },
    { name: 'Basic Packages', value: 10, color: '#22c55e' }
  ];

  // Appointment Status Distribution
  const appointmentStatusData = [
    { name: 'Completed', value: 60, color: '#22c55e' },
    { name: 'Scheduled', value: 25, color: '#3b82f6' },
    { name: 'Pending', value: 10, color: '#f97316' },
    { name: 'Cancelled', value: 5, color: '#ef4444' }
  ];

  // Customer Age Groups
  const ageGroupsData = [
    { name: '18-30', value: 25, color: '#ef4444' },
    { name: '31-45', value: 35, color: '#f97316' },
    { name: '46-60', value: 28, color: '#eab308' },
    { name: '60+', value: 12, color: '#22c55e' }
  ];

  // Animate charts on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${payload[0].name}`}</p>
          <p className="text-gray-600">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * startAngle);
    const cos = Math.cos(-RADIAN * startAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
          {payload.name}
        </text>
        <path d={`M ${sx} ${sy} L ${mx} ${my} L ${ex} ${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Test Categories Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Categories Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={testCategoriesData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {testCategoriesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue by Test Type */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Test Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={revenueData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {revenueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Appointment Status Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={appointmentStatusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              animationBegin={400}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {appointmentStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Age Groups */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Age Groups</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ageGroupsData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              animationBegin={600}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {ageGroupsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
