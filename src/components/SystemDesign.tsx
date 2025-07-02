import React, { useEffect, useRef, useState } from 'react';
import { TabData } from '../types';

const SystemDesign: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('base');
  const sectionRef = useRef<HTMLElement>(null);

  const tabs: TabData[] = [
    {
      id: 'base',
      label: 'Mobile Base',
      title: 'Mobile Base',
      description: 'A lightweight aluminum 290mm square base provides a stable and compact foundation. Mobility is achieved through a differential drive system with two 80mm rubber wheels powered by N20 geared motors, ensuring a balance of speed (0.6 m/s max) and torque for precise maneuvering.',
      specifications: [
        'Structure: 290mm x 290mm Aluminum Frame',
        'Mobility: Differential Drive (2 powered, 2 casters)',
        'Motors: N20 DC Geared (100:1 Ratio)',
        'Weight: Approximately 1.5 kg'
      ]
    },
    {
      id: 'mast',
      label: 'Telescoping Mast',
      title: 'Telescoping Mast',
      description: 'To reach into the 600mm beaker, a motorized carbon fiber mast extends from a collapsed height of 140mm to 650mm. Its 2.5mm wall thickness provides a 3.0 safety factor against Euler buckling, ensuring rigidity and precision even at full extension.',
      specifications: [
        'Material: Carbon Fiber Tubes',
        'Height: 140mm (collapsed) to 650mm (extended)',
        'Mechanism: Leadscrew driven by 5W DC motor',
        'Weight: Approximately 0.9 kg'
      ]
    },
    {
      id: 'gripper',
      label: 'Vacuum Gripper',
      title: 'Vacuum Gripper System',
      description: 'Inspired by the Festo FlexShapeGripper, this system uses a soft silicone cap filled with ground coffee. A Venturi aspirator creates a 75 kPa vacuum, causing the granular material to "jam" and conform perfectly to the ping pong ball, ensuring a secure grip in under 200ms.',
      specifications: [
        'Gripper Head: Granular jamming silicone cap',
        'Vacuum System: Venturi aspirator (75 kPa)',
        'Holding Force: >0.27 N (10x Safety Factor)',
        'Acquisition Time: <200 ms'
      ]
    },
    {
      id: 'control',
      label: 'Control System',
      title: 'Control System',
      description: 'A Raspberry Pi Pico W serves as the brain, managing motor control and sensor integration. A 433 MHz RF link provides low-latency remote control from 10m away, while an ESP32-CAM offers a real-time video feed. High-resolution encoders and an Extended Kalman Filter achieve ±2mm positioning accuracy.',
      specifications: [
        'Microcontroller: Raspberry Pi Pico W',
        'Remote Control: 433 MHz RF System (<50ms latency)',
        'Vision: ESP32-CAM for live video',
        'Precision: High-resolution encoders + EKF'
      ]
    },
    {
      id: 'power',
      label: 'Power Supply',
      title: 'Power Supply',
      description: 'A lightweight 3S 1300 mAh LiPo battery powers the entire system. Weighing only 115g, it provides an estimated 45-65 minutes of runtime under normal operating conditions. Dynamic power management allocates energy efficiently across idle (5.5W), normal (8.5W), and peak (12W) modes.',
      specifications: [
        'Battery: 3S 1300 mAh LiPo (11.1V)',
        'Weight: 115 g',
        'Runtime: 45-65 minutes',
        'Power Modes: Idle (5.5W), Normal (8.5W), Peak (12W)'
      ]
    }
  ];

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

  const activeTabData = tabs.find(tab => tab.id === activeTab)!;

  return (
    <section 
      id="system" 
      ref={sectionRef}
      className={`mb-20 scroll-mt-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h3 className="text-3xl font-bold text-center mb-4 text-stone-900">System Design</h3>
      <p className="text-center text-stone-600 mb-10 max-w-5xl mx-auto text-lg">
        The robot's design is a synthesis of five core subsystems, each optimized for performance and reliability. 
        Click through the tabs below to explore each component's specifications and role within the integrated system.
      </p>
      <div className="bg-white rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
        <div className="border-b border-stone-200">
          <nav className="-mb-px flex flex-wrap justify-center sm:justify-start space-x-1 sm:space-x-4 px-4 sm:px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-3 border-b-2 font-medium text-base transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-600 bg-teal-50'
                    : 'text-stone-500 hover:text-teal-700 hover:border-teal-300 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-8 md:p-12">
          <div className="transition-opacity duration-300">
            <h4 className="text-2xl font-semibold mb-4 text-stone-800">{activeTabData.title}</h4>
            <p className="text-stone-600 mb-6 text-lg">{activeTabData.description}</p>
            <ul className="list-disc list-inside space-y-2 text-stone-700 text-base">
              {activeTabData.specifications.map((spec, index) => (
                <li key={index}>
                  <strong>{spec.split(':')[0]}:</strong>{spec.split(':')[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemDesign;