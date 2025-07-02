import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GripperChart: React.FC = () => {
  const data = [
    {
      name: 'Required Holding Force',
      value: 0.52,
      color: '#ef4444'
    },
    {
      name: 'Practical Gripping Force',
      value: 21.4,
      color: '#22c55e'
    }
  ];

  const CustomBar = (props: any) => {
    const { fill, ...rest } = props;
    const fillColor = data.find(item => item.name === rest.payload.name)?.color || fill;
    return <Bar {...rest} fill={fillColor} />;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: '#57534e' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          scale="log"
          domain={['dataMin', 'dataMax']}
          tick={{ fontSize: 12, fill: '#57534e' }}
          label={{ value: 'Force (Log Scale)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#57534e', fontWeight: 'bold' } }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            border: '1px solid #0d9488',
            borderRadius: '8px',
            color: '#f0fdfa'
          }}
          formatter={(value) => [`${value} N`, 'Force']}
        />
        <Bar 
          dataKey="value" 
          shape={CustomBar}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GripperChart;