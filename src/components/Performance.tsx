import React, { useEffect, useRef, useState } from 'react';

const Performance: React.FC = () => {
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
      id="performance" 
      ref={sectionRef}
      className={`scroll-mt-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h3 className="text-3xl font-bold text-center mb-4 text-stone-900">Performance & Operation</h3>
      <p className="text-center text-stone-600 mb-10 max-w-5xl mx-auto text-lg">
        The integration of these systems results in a robot that is not only compliant with all constraints but is also highly effective, 
        repeatable, and fast. The operational sequence is streamlined for rapid task execution.
      </p>
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-stone-200">
        <h4 className="text-xl font-semibold mb-8 text-center text-stone-800">Operational Sequence</h4>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="text-center p-4 bg-teal-50 rounded-xl border border-teal-100 shadow-sm w-full md:w-auto flex-shrink-0">
            <div className="flex items-center justify-center bg-teal-100 rounded-full w-20 h-20 mx-auto mb-3 border-2 border-teal-200">
              <span className="text-3xl font-bold text-teal-600">1</span>
            </div>
            <p className="font-medium text-lg text-stone-800">Navigate</p>
            <p className="text-sm text-stone-500">to tall beaker</p>
          </div>
          <div className="text-3xl text-teal-300 hidden md:block">→</div>
          <div className="text-center p-4 bg-teal-50 rounded-xl border border-teal-100 shadow-sm w-full md:w-auto flex-shrink-0">
            <div className="flex items-center justify-center bg-teal-100 rounded-full w-20 h-20 mx-auto mb-3 border-2 border-teal-200">
              <span className="text-3xl font-bold text-teal-600">2</span>
            </div>
            <p className="font-medium text-lg text-stone-800">Extract</p>
            <p className="text-sm text-stone-500">extend, grip, retract</p>
          </div>
          <div className="text-3xl text-teal-300 hidden md:block">→</div>
          <div className="text-center p-4 bg-teal-50 rounded-xl border border-teal-100 shadow-sm w-full md:w-auto flex-shrink-0">
            <div className="flex items-center justify-center bg-teal-100 rounded-full w-20 h-20 mx-auto mb-3 border-2 border-teal-200">
              <span className="text-3xl font-bold text-teal-600">3</span>
            </div>
            <p className="font-medium text-lg text-stone-800">Navigate</p>
            <p className="text-sm text-stone-500">to small beaker</p>
          </div>
          <div className="text-3xl text-teal-300 hidden md:block">→</div>
          <div className="text-center p-4 bg-teal-50 rounded-xl border border-teal-100 shadow-sm w-full md:w-auto flex-shrink-0">
            <div className="flex items-center justify-center bg-teal-100 rounded-full w-20 h-20 mx-auto mb-3 border-2 border-teal-200">
              <span className="text-3xl font-bold text-teal-600">4</span>
            </div>
            <p className="font-medium text-lg text-stone-800">Place</p>
            <p className="text-sm text-stone-500">lower, release, retract</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;