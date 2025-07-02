import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-20 border-t border-stone-200 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-500 text-sm">
        <p>&copy; 2025 Robotics Design Challenge. All rights reserved.</p>
        <p className="mt-2">Interactive Report | Generated from source material.</p>
      </div>
    </footer>
  );
};

export default Footer;