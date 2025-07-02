import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-teal-700">Robotics Design Report</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="#overview" className="text-stone-600 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Overview</a>
              <a href="#challenge" className="text-stone-600 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">The Challenge</a>
              <a href="#system" className="text-stone-600 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">System Design</a>
              <a href="#analysis" className="text-stone-600 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Engineering Analysis</a>
              <a href="#performance" className="text-stone-600 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Performance</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;