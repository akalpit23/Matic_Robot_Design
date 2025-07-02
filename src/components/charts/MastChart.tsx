import React from 'react';

const MastChart: React.FC = () => {
  const data = [
    { name: 'Required Critical Load', value: 45, color: 'bg-red-500', maxValue: 2500 },
    { name: 'Current Design (1.5mm)', value: 1571, color: 'bg-green-500', maxValue: 2500 },
    { name: 'Enhanced Design (2.0mm)', value: 2437, color: 'bg-blue-500', maxValue: 2500 }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4">
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">{item.name}</span>
              <span className="text-sm font-bold text-stone-800">{item.value} N</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-6">
              <div 
                className={`h-6 rounded-full ${item.color} transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                style={{ width: `${(item.value / item.maxValue) * 100}%` }}
              >
                <span className="text-xs text-white font-medium">
                  {item.value}N
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-stone-500 text-center">
        Load Capacity (Newtons)
      </div>
    </div>
  );
};

export default MastChart;