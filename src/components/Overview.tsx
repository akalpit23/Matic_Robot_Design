import React, { useEffect, useRef, useState } from 'react';

const Overview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="overview" 
      ref={sectionRef}
      className={`mb-20 scroll-mt-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
          Ping Pong Ball Manipulation Robot
        </h2>
        <p className="mt-6 max-w-4xl mx-auto text-xl text-stone-600">
          An optimized design for a lightweight, mobile robot engineered to excel in a precision manipulation challenge, 
          integrating a robust mobile base, a telescoping mast, and an innovative vacuum gripper system.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="text-5xl font-bold text-teal-600">4.4 kg</div>
          <p className="mt-3 text-stone-600 text-lg">Total Mass (&lt; 5kg Limit)</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="text-5xl font-bold text-teal-600">2 sec</div>
          <p className="mt-3 text-stone-600 text-lg">Target Cycle Time</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="text-5xl font-bold text-teal-600">±2 mm</div>
          <p className="mt-3 text-stone-600 text-lg">Positioning Accuracy</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="text-5xl font-bold text-teal-600">65 min</div>
          <p className="mt-3 text-stone-600 text-lg">Est. Runtime</p>
        </div>
      </div>
    </section>
  );
};

export default Overview;