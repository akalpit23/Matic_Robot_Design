import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PowerChart: React.FC = () => {
  const data = [
    { name: 'Motors (Avg)', value: 5.76, color: '#a7f3d0' },
    { name: 'Vacuum Pump (Avg)', value: 0.72, color: '#5eead4' },
    { name: 'Electronics (Avg)', value: 3.0, color: '#14b8a6' }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            border: '1px solid #0d9488',
            borderRadius: '8px',
            color: '#f0fdfa'
          }}
          formatter={(value) => [`${value} W`, 'Power']}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          wrapperStyle={{ color: '#44403c', fontSize: '14px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PowerChart;