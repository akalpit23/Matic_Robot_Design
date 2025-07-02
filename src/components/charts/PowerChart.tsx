import React from 'react';

const PowerChart: React.FC = () => {
  const data = [
    { name: 'Motors (Avg)', value: 5.76, color: 'bg-teal-300', percentage: 0 },
    { name: 'Vacuum Pump (Avg)', value: 0.72, color: 'bg-teal-500', percentage: 0 },
    { name: 'Electronics (Avg)', value: 3.0, color: 'bg-teal-700', percentage: 0 }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate percentages
  data.forEach(item => {
    item.percentage = (item.value / total) * 100;
  });

  return (
    <div className="w-full h-full flex flex-col justify-center p-4">
      {/* Circular representation */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-stone-200"></div>
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-stone-800">{total.toFixed(1)}</div>
              <div className="text-xs text-stone-600">Watts</div>
            </div>
          </div>
          {/* Simple pie segments using borders - simplified approach */}
          <div className="absolute inset-0 rounded-full border-8 border-teal-300" style={{
            background: `conic-gradient(#7dd3fc 0% ${data[0].percentage}%, #14b8a6 ${data[0].percentage}% ${data[0].percentage + data[1].percentage}%, #0f766e ${data[0].percentage + data[1].percentage}% 100%)`
          }}></div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm text-stone-700">{item.name}</span>
            </div>
            <div className="text-sm font-medium text-stone-800">
              {item.value}W ({item.percentage.toFixed(1)}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerChart;