import React from 'react';

const GripperChart: React.FC = () => {
  const data = [
    { name: 'Required Holding Force', value: 0.52, displayValue: '0.52', color: 'bg-red-500' },
    { name: 'Practical Gripping Force', value: 21.4, displayValue: '21.4', color: 'bg-green-500' }
  ];

  // Since we have very different scales, we'll use logarithmic-like visual representation
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="w-full h-full flex flex-col justify-center p-4">
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-stone-700">{item.name}</span>
              <span className="text-sm font-bold text-stone-800">{item.displayValue} N</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-6">
              <div 
                className={`h-6 rounded-full ${item.color} transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                style={{ 
                  width: index === 0 ? '8%' : '100%' // Visual representation showing the huge difference
                }}
              >
                <span className="text-xs text-white font-medium">
                  {item.displayValue}N
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Safety margin indicator */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="text-center">
          <div className="text-lg font-bold text-green-700">41.2x</div>
          <div className="text-xs text-green-600">Safety Margin</div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-stone-500 text-center">
        Force Comparison (Newtons)
      </div>
    </div>
  );
};

export default GripperChart;