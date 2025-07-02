import React from 'react';

const MotorChart: React.FC = () => {
  const data = [
    { name: 'Required Motor Torque', value: 2.01, color: 'bg-red-500', maxValue: 25 },
    { name: 'Typical N20 Motor Torque', value: 20, color: 'bg-green-500', maxValue: 25 }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4">
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">{item.name}</span>
              <span className="text-sm font-bold text-stone-800">{item.value} mNm</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-6">
              <div 
                className={`h-6 rounded-full ${item.color} transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                style={{ width: `${(item.value / item.maxValue) * 100}%` }}
              >
                <span className="text-xs text-white font-medium">
                  {item.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-stone-500 text-center">
        Torque (milli-Newton meters)
      </div>
    </div>
  );
};

export default MotorChart;