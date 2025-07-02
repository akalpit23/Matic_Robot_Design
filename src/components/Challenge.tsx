import React, { useEffect, useRef, useState } from 'react';

const Challenge: React.FC = () => {
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
      id="challenge" 
      ref={sectionRef}
      className={`mb-20 scroll-mt-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-stone-200">
        <h3 className="text-3xl font-bold text-center mb-8 text-stone-900">The Design Challenge</h3>
        <p className="text-center text-stone-600 mb-10 max-w-5xl mx-auto text-lg">
          The core task is to design a mobile robot to extract a 50mm ping pong ball from a 600mm tall beaker 
          and place it into a 150mm tall beaker. The design must adhere to strict constraints on initial size, 
          weight, and mobility, while aiming for elegance, effectiveness, and speed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-stone-100 p-5 rounded-xl border border-stone-200">
            <div className="text-3xl font-semibold text-teal-700">≤ 5 kg</div>
            <p className="mt-1 text-base text-stone-500">Mass Constraint</p>
          </div>
          <div className="bg-stone-100 p-5 rounded-xl border border-stone-200">
            <div className="text-3xl font-semibold text-teal-700">≤ 150 mm</div>
            <p className="mt-1 text-base text-stone-500">Initial Height</p>
          </div>
          <div className="bg-stone-100 p-5 rounded-xl border border-stone-200">
            <div className="text-3xl font-semibold text-teal-700">≤ 300mm²</div>
            <p className="mt-1 text-base text-stone-500">Initial Footprint</p>
          </div>
          <div className="bg-stone-100 p-5 rounded-xl border border-stone-200">
            <div className="text-3xl font-semibold text-teal-700">10 m</div>
            <p className="mt-1 text-base text-stone-500">Remote Control Range</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenge;