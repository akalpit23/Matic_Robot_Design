import React, { useState } from 'react';

interface CalculationBlockProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

const CalculationBlock: React.FC<CalculationBlockProps> = ({ id, title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-center mt-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-50 text-teal-700 px-6 py-3 rounded-xl text-base font-medium hover:bg-teal-100 transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        {isOpen ? 'Hide Calculation' : 'Show Calculation'}
      </button>
      <div 
        className={`text-left mt-6 p-6 bg-stone-50 rounded-xl text-sm text-stone-600 leading-relaxed transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default CalculationBlock;