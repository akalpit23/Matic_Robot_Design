import React, { useEffect, useRef, useState } from 'react';
import MastChart from './charts/MastChart';
import MotorChart from './charts/MotorChart';
import PowerChart from './charts/PowerChart';
import GripperChart from './charts/GripperChart';
import CalculationBlock from './CalculationBlock';

const EngineeringAnalysis: React.FC = () => {
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

  const mastCalculationContent = (
    <div className="font-mono text-sm leading-relaxed">
      <p className="font-sans font-medium text-stone-800 mb-3 text-base">Detailed Engineering Calculations for Mobile Robot Design</p>
      <p className="font-sans font-medium text-stone-800 mb-2">1. Mast Stability Analysis (Euler Buckling Analysis)</p>
      <p className="font-sans text-stone-700 mb-2">Understanding the Problem</p>
      <p className="font-sans text-stone-600 mb-4">Your telescoping mast is like a tall, slender column under compression. When you extend it to grab the ping pong ball, it's fighting against the fundamental physics of column buckling. Think of it like trying to balance a pencil on its tip - the longer and thinner it gets, the more likely it is to suddenly bend and fail. This is exactly what Euler discovered in 1744.</p>
      <p className="font-sans text-stone-700 mb-2">The Fundamental Euler Buckling Equation</p>
      <p className="font-sans text-stone-600 mb-4">The critical buckling load is given by:</p>
      <div className="mb-4 text-center font-semibold">P<sub>critical</sub> = π²EI/(KL)²</div>
      <p className="font-sans text-stone-600 mb-4">Where each term represents:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>P<sub>critical</sub>: The maximum force before the mast buckles (Newtons)</li>
        <li>E: Elastic modulus of carbon fiber = 230 GPa = 230 × 10⁹ Pa</li>
        <li>I: Second moment of inertia (mm⁴) - this is the geometric resistance to bending</li>
        <li>K: Effective length factor = 2.0 (cantilever beam - fixed at base, free at top)</li>
        <li>L: Extended length = 650 mm</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Calculating the Second Moment of Inertia</p>
      <p className="font-sans text-stone-600 mb-4">For a hollow circular tube (which is what your carbon fiber mast is):</p>
      <div className="mb-4 text-center font-semibold">I = π/64 (D<sub>outer</sub>⁴ - D<sub>inner</sub>⁴)</div>
      <p className="font-sans text-stone-600 mb-2">Let's work through this step by step:</p>
      <p className="font-sans text-stone-700 mb-2">Current Design Analysis (1.5mm wall thickness):</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Outer diameter: D<sub>outer</sub> = 14 mm</li>
        <li>Inner diameter: D<sub>inner</sub> = 14 - 2(1.5) = 11 mm</li>
        <li>I<sub>current</sub> = (π/64) × (14⁴ - 11⁴)</li>
        <li>I<sub>current</sub> = (π/64) × (38,416 - 14,641)</li>
        <li>I<sub>current</sub> = (π/64) × 23,775</li>
        <li>I<sub>current</sub> = 1,168 mm⁴</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Critical Load with Current Design:</p>
      <div className="mb-4 space-y-2">
        <div className="text-center">P<sub>critical</sub> = π² × 230 × 10⁹ × 1,168 × 10⁻¹²/(2.0 × 0.65)²</div>
        <div className="text-center">P<sub>critical</sub> = π² × 230 × 1.168/1.69</div>
        <div className="text-center">P<sub>critical</sub> = 2,655/1.69 = 1,571 N</div>
      </div>
      <p className="font-sans text-stone-700 mb-2">Realistic Force Analysis</p>
      <p className="font-sans text-stone-600 mb-2">The actual forces your mast must handle:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Weight of gripper assembly: ≈ 0.5 kg × 9.81 = 4.9 N</li>
        <li>Weight of ping pong ball: 0.0027 kg × 9.81 = 0.026 N</li>
        <li>Dynamic forces during acceleration: ≈ 2 × static = 10 N</li>
        <li>Total design load: ≈ 15 N</li>
      </ul>
      <p className="font-sans text-stone-600 mb-2">But here's the critical insight: We need a safety factor of at least 3.0 for structural components, so our required critical load is:</p>
      <div className="mb-4 text-center">P<sub>required</sub> = 15 N × 3.0 = 45 N</div>
      <p className="font-sans text-stone-600 mb-4">Checking our current design: Since P<sub>critical</sub> (1,571 N) ≫ P<sub>required</sub> (45 N), our current 1.5mm wall thickness is actually more than adequate!</p>
      <p className="font-sans text-stone-700 mb-2">Slenderness Ratio Check</p>
      <p className="font-sans text-stone-600 mb-2">The slenderness ratio determines if Euler buckling theory applies:</p>
      <div className="mb-2 text-center">Slenderness Ratio = L/r</div>
      <p className="font-sans text-stone-600 mb-2">where r = √(I/A) (radius of gyration)</p>
      <p className="font-sans text-stone-600 mb-2">For our tube:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Cross-sectional area: A = π × (7² - 5.5²) = 58.9 mm²</li>
        <li>Radius of gyration: r = √(1,168/58.9) = 4.45 mm</li>
        <li>Slenderness ratio: 650/4.45 = 146</li>
      </ul>
      <p className="font-sans text-stone-600 mb-4">Since this is &gt; 120, Euler buckling theory definitely applies (we're in the "long column" regime).</p>
      <p className="font-sans text-stone-700 mb-2">Recommended Design Enhancement</p>
      <p className="font-sans text-stone-600 mb-2">While structurally adequate, for optimal stiffness and vibration resistance, increase wall thickness to 2.0mm:</p>
      <p className="font-sans text-stone-700 mb-2">Enhanced Design (2.0mm wall thickness):</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Outer diameter: 14 mm</li>
        <li>Inner diameter: 10 mm</li>
        <li>I<sub>enhanced</sub> = (π/64) × (14⁴ - 10⁴) = 1,917 mm⁴</li>
        <li>P<sub>critical</sub> = 2,437 N</li>
        <li>Safety factor = 2,437/15 = 162 (excellent!)</li>
      </ul>
      <span className="font-bold text-teal-600 text-base">This enhanced design provides superior vibration resistance and positioning accuracy.</span>
    </div>
  );

  const motorCalculationContent = (
    <div className="font-mono text-sm leading-relaxed">
      <p className="font-sans font-medium text-stone-800 mb-2">2. Motor Torque Analysis (Force and Torque Calculations)</p>
      <p className="font-sans text-stone-700 mb-2">Understanding Robot Forces</p>
      <p className="font-sans text-stone-600 mb-4">Your robot must overcome several forces to move successfully. Think of it like trying to push a heavy box across different surfaces - sometimes it's easy (smooth floor), sometimes it's hard (thick carpet), and sometimes you need extra force to speed up or slow down.</p>
      <p className="font-sans text-stone-700 mb-2">Step 1: Calculate Rolling Resistance</p>
      <p className="font-sans text-stone-600 mb-2">Rolling resistance is the continuous force needed to keep wheels rolling:</p>
      <div className="mb-2 text-center">F<sub>rolling</sub> = μ<sub>r</sub> × N</div>
      <p className="font-sans text-stone-600 mb-2">Where:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>μ<sub>r</sub>: Rolling resistance coefficient (depends on surface)</li>
        <li>N: Normal force = robot weight = mass × gravity</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Surface coefficients:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Smooth surfaces (tile, wood): μ<sub>r</sub> = 0.01</li>
        <li>Carpet: μ<sub>r</sub> = 0.03</li>
        <li>Worst case (thick carpet): μ<sub>r</sub> = 0.05</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Design mass breakdown:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Base and motors: 1.0 kg</li>
        <li>Mast and gripper: 1.0 kg</li>
        <li>Electronics and battery: 0.5 kg</li>
        <li>Structural components: 0.5 kg</li>
        <li>Total mass: 3.0 kg</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Rolling resistance calculation:</p>
      <div className="mb-4 space-y-2">
        <div>F<sub>rolling</sub> = 0.05 × (3.0 kg × 9.81 m/s²)</div>
        <div>F<sub>rolling</sub> = 0.05 × 29.43 N = 1.47 N</div>
      </div>
      <p className="font-sans text-stone-700 mb-2">Step 2: Calculate Acceleration Force</p>
      <p className="font-sans text-stone-600 mb-2">For responsive movement, target acceleration of 1.0 m/s²:</p>
      <div className="mb-4 space-y-2">
        <div>F<sub>acceleration</sub> = mass × acceleration</div>
        <div>F<sub>acceleration</sub> = 3.0 kg × 1.0 m/s² = 3.0 N</div>
      </div>
      <p className="font-sans text-stone-700 mb-2">Step 3: Calculate Climbing Force</p>
      <p className="font-sans text-stone-600 mb-2">For navigating small obstacles or cable management bumps (5° incline):</p>
      <div className="mb-4 space-y-2">
        <div>F<sub>climbing</sub> = mass × gravity × sin(θ)</div>
        <div>F<sub>climbing</sub> = 3.0 × 9.81 × sin(5°) = 2.56 N</div>
      </div>
      <p className="font-sans text-stone-700 mb-2">Step 4: Total Force Requirement</p>
      <div className="mb-4 space-y-2">
        <div>F<sub>total</sub> = F<sub>rolling</sub> + F<sub>acceleration</sub> + F<sub>climbing</sub></div>
        <div>F<sub>total</sub> = 1.47 + 3.0 + 2.56 = 7.03 N</div>
      </div>
      <p className="font-sans text-stone-600 mb-2">With 2.0 safety factor:</p>
      <div className="mb-4">F<sub>design</sub> = 7.03 × 2.0 = 14.06 N</div>
      <p className="font-sans text-stone-700 mb-2">Step 5: Convert to Motor Torque</p>
      <p className="font-sans text-stone-600 mb-2">For mecanum drive with 4 wheels:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Force per wheel: F<sub>wheel</sub> = 14.06 N / 4 = 3.52 N</li>
        <li>Wheel radius: r = 40 mm = 0.04 m</li>
        <li>Torque<sub>per_motor</sub> = F<sub>wheel</sub> × radius</li>
        <li>Torque<sub>per_motor</sub> = 3.52 N × 0.04 m = 0.141 Nm = 141 mNm</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Step 6: Account for Gearing and Efficiency</p>
      <p className="font-sans text-stone-600 mb-2">N20 motor with 100:1 reduction:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Gear efficiency: η = 0.7 (typical for small gears)</li>
        <li>Required motor torque: T<sub>motor</sub> = 141 mNm / (100 × 0.7) = 2.01 mNm</li>
      </ul>
      <p className="font-sans text-stone-600 mb-4">N20 motors typically provide 15-25 mNm, so we have excellent margin!</p>
      <p className="font-sans text-stone-700 mb-2">Validation Check</p>
      <p className="font-sans text-stone-600 mb-2">Available torque at wheel:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>N20 torque: 20 mNm (typical)</li>
        <li>Gear ratio: 100:1</li>
        <li>Efficiency: 0.7</li>
        <li>Wheel torque: 20 × 100 × 0.7 = 1,400 mNm = 1.4 Nm</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Force capability:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Force per wheel: 1.4 Nm / 0.04 m = 35 N</li>
        <li>Total robot force: 35 × 4 = 140 N</li>
      </ul>
      <span className="font-bold text-teal-600 text-base">This provides a 10× safety margin - excellent for reliable operation!</span>
    </div>
  );

  const powerCalculationContent = (
    <div className="font-mono text-sm leading-relaxed">
      <p className="font-sans font-medium text-stone-800 mb-2">3. Power Budget Analysis</p>
      <p className="font-sans text-stone-700 mb-2">Understanding Power Flow</p>
      <p className="font-sans text-stone-600 mb-4">Power flows through your robot like water through pipes. Every component draws current, and that current × voltage = power. Think of your battery as a reservoir that must supply all the demand without running dry during the mission.</p>
      <p className="font-sans text-stone-700 mb-2">Component-by-Component Analysis</p>
      <p className="font-sans text-stone-700 mb-2">Motor System (Primary Power Consumer):</p>
      <p className="font-sans text-stone-600 mb-2">Motor Specifications (per N20):</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Stall current: 2.5 A at 6V</li>
        <li>No-load current: 0.15 A at 6V</li>
        <li>Operating current (loaded): ≈ 0.4 A at 6V</li>
      </ul>
      <p className="font-sans text-stone-600 mb-4">Power per motor = 6V × 0.4A = 2.4W</p>
      <p className="font-sans text-stone-600 mb-4">Four motors total = 4 × 2.4W = 9.6W</p>
      <p className="font-sans text-stone-700 mb-2">Vacuum Pump System:</p>
      <p className="font-sans text-stone-600 mb-2">Pump Specifications:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Operating voltage: 12V</li>
        <li>Operating current: 0.3A</li>
        <li>Duty cycle: 20% (only during pickup/placement)</li>
      </ul>
      <p className="font-sans text-stone-600 mb-4">Average power = 12V × 0.3A × 0.2 = 0.72W</p>
      <p className="font-sans text-stone-700 mb-2">Electronics and Control:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Raspberry Pi Pico W: 5V × 0.1A = 0.5W</li>
        <li>Motor controllers (4×): 5V × 0.05A × 4 = 1.0W</li>
        <li>Camera system: 5V × 0.2A = 1.0W</li>
        <li>Sensors and misc: 5V × 0.1A = 0.5W</li>
      </ul>
      <p className="font-sans text-stone-600 mb-4">Total electronics: 3.0W</p>
      <p className="font-sans text-stone-700 mb-2">Complete Power Budget:</p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-teal-100 text-teal-800">
              <th className="p-2 border border-teal-200">Component</th>
              <th className="p-2 border border-teal-200">Power (Watts)</th>
              <th className="p-2 border border-teal-200">Duty Cycle</th>
              <th className="p-2 border border-teal-200">Average Power</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-stone-200">Motors (4×)</td>
              <td className="p-2 border border-stone-200">9.6</td>
              <td className="p-2 border border-stone-200">60%</td>
              <td className="p-2 border border-stone-200">5.76</td>
            </tr>
            <tr>
              <td className="p-2 border border-stone-200">Vacuum pump</td>
              <td className="p-2 border border-stone-200">3.6</td>
              <td className="p-2 border border-stone-200">20%</td>
              <td className="p-2 border border-stone-200">0.72</td>
            </tr>
            <tr>
              <td className="p-2 border border-stone-200">Electronics</td>
              <td className="p-2 border border-stone-200">3.0</td>
              <td className="p-2 border border-stone-200">100%</td>
              <td className="p-2 border border-stone-200">3.0</td>
            </tr>
            <tr>
              <td className="p-2 border border-stone-200 font-bold">TOTAL</td>
              <td className="p-2 border border-stone-200 font-bold">16.2</td>
              <td className="p-2 border border-stone-200 font-bold">-</td>
              <td className="p-2 border border-stone-200 font-bold">9.48</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="font-sans text-stone-700 mb-2">Battery Sizing Calculation</p>
      <p className="font-sans text-stone-700 mb-2">Mission Requirements:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Competition time: 5 minutes maximum</li>
        <li>Practice sessions: 30 minutes desired</li>
        <li>Design target: 45 minutes runtime</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Energy calculation:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Energy required = Average power × Time</li>
        <li>Energy required = 9.48W × 0.75 hours = 7.11 Wh</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Battery sizing with 50% margin:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Battery capacity needed = 7.11 Wh × 1.5 = 10.67 Wh</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Selecting LiPo configuration:</p>
      <p className="font-sans text-stone-700 mb-2">Option 1: 2S Configuration (7.4V nominal)</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Required amp-hours = 10.67 Wh / 7.4V = 1.44 Ah = 1,440 mAh</li>
        <li>Recommended: 2S 1800mAh 25C LiPo</li>
        <li>Weight: ≈ 95g</li>
        <li>Continuous current: 1.8A × 25 = 45A (excellent margin)</li>
        <li>Runtime: (1.8 × 7.4) / 9.48 = 1.4 hours</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Option 2: 3S Configuration (11.1V nominal)</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Required amp-hours = 10.67 Wh / 11.1V = 0.96 Ah = 960 mAh</li>
        <li>Recommended: 3S 1300mAh 25C LiPo</li>
        <li>Weight: ≈ 115g</li>
        <li>Continuous current: 1.3A × 25 = 32.5A (excellent margin)</li>
        <li>Runtime: (1.3 × 11.1) / 9.48 = 1.52 hours</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Recommendation: Use 3S 1300mAh configuration</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Higher voltage reduces current requirements</li>
        <li>Better efficiency in voltage regulators</li>
        <li>More compact than equivalent 2S pack</li>
        <li>Provides 90+ minutes of operation</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Power Distribution Analysis</p>
      <p className="font-sans text-stone-700 mb-2">Voltage regulation requirements:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Motors: Need 6V (regulate down from 11.1V)</li>
        <li>Electronics: Need 5V (regulate down from 11.1V)</li>
        <li>Vacuum pump: Need 12V (boost up from 11.1V, or use pump rated for 11.1V)</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Efficiency calculations:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Step-down regulation (11.1V→6V): ≈ 90% efficient</li>
        <li>Step-down regulation (11.1V→5V): ≈ 88% efficient</li>
        <li>Boost regulation (11.1V→12V): ≈ 85% efficient</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Adjusted power budget with regulation losses:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Motor power at battery: 5.76W / 0.90 = 6.4W</li>
        <li>Electronics power at battery: 3.0W / 0.88 = 3.41W</li>
        <li>Vacuum power at battery: 0.72W / 0.85 = 0.85W</li>
      </ul>
      <span className="font-bold text-teal-600 text-base">Total battery power: 10.66W (very close to our 10.67W calculation!)</span>
    </div>
  );

  const gripperCalculationContent = (
    <div className="font-mono text-sm leading-relaxed">
      <p className="font-sans font-medium text-stone-800 mb-2">4. Gripper Force Safety Margin Analysis</p>
      <p className="font-sans text-stone-700 mb-2">Understanding Vacuum Physics</p>
      <p className="font-sans text-stone-600 mb-4">Your granular gripper works by creating a pressure difference between inside and outside the gripper membrane. When you remove air from inside, atmospheric pressure pushes on the outside, creating a clamping force. It's like having the entire atmosphere helping you grip the ball!</p>
      <p className="font-sans text-stone-700 mb-2">Calculating Atmospheric Force</p>
      <p className="font-sans text-stone-600 mb-2">Available pressure differential:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Atmospheric pressure: 101,325 Pa (14.7 psi)</li>
        <li>Achievable vacuum: -80 kPa (-11.6 psi) with small pump</li>
        <li>Pressure differential: 80,000 Pa</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Effective Gripping Area</p>
      <p className="font-sans text-stone-600 mb-2">Ping pong ball contact analysis:</p>
      <p className="font-sans text-stone-600 mb-2">The gripper contacts the ball over a circular area. For a 50mm diameter ball contacted by a conforming gripper:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Contact diameter ≈ 0.6 × ball diameter = 0.6 × 50mm = 30mm</li>
        <li>Contact area = π × (15mm)² = 707 mm² = 7.07 cm²</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Maximum Theoretical Force</p>
      <div className="mb-4 space-y-2">
        <div>F<sub>max</sub> = Pressure differential × Contact area</div>
        <div>F<sub>max</sub> = 80,000 Pa × 7.07 × 10⁻⁴ m²</div>
        <div>F<sub>max</sub> = 56.6 N</div>
      </div>
      <p className="font-sans text-stone-700 mb-2">Practical Force Analysis</p>
      <p className="font-sans text-stone-600 mb-2">Real-world reductions:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Vacuum pump efficiency: 0.7 (achieves 70% of theoretical vacuum)</li>
        <li>Gripper conformity: 0.6 (granular material doesn't perfectly seal)</li>
        <li>Surface roughness: 0.9 (ping pong ball is smooth)</li>
      </ul>
      <div className="mb-4 space-y-2">
        <div>F<sub>practical</sub> = F<sub>max</sub> × 0.7 × 0.6 × 0.9</div>
        <div>F<sub>practical</sub> = 56.6 × 0.378 = 21.4 N</div>
      </div>
      <p className="font-sans text-stone-700 mb-2">Required Force Analysis</p>
      <p className="font-sans text-stone-600 mb-2">Forces to overcome:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Ball weight: 0.0027 kg × 9.81 m/s² = 0.026 N</li>
        <li>Acceleration forces (2g): 0.026 × 2 = 0.052 N</li>
        <li>Safety factor (10×): 0.052 × 10 = 0.52 N</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Safety Margin Calculation</p>
      <div className="mb-4 space-y-2">
        <div>Safety margin = F<sub>practical</sub> / F<sub>required</sub></div>
        <div>Safety margin = 21.4 N / 0.52 N = 41.2</div>
      </div>
      <span className="font-bold text-teal-600 text-base">This means our gripper can hold over 40 times the required force!</span>
      <p className="font-sans text-stone-700 mb-2 mt-4">Vacuum System Sizing</p>
      <p className="font-sans text-stone-600 mb-2">To achieve 80 kPa vacuum differential:</p>
      <p className="font-sans text-stone-700 mb-2">Pump flow rate calculation:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Gripper chamber volume: ≈ 100 cm³</li>
        <li>Target evacuation time: 200ms</li>
        <li>Required pump flow: 100 cm³ / 0.2s = 500 cm³/s = 0.5 L/s = 30 L/min</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Recommended pump specifications:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Flow rate: 35+ L/min</li>
        <li>Ultimate vacuum: 85+ kPa</li>
        <li>Power consumption: &lt;15W</li>
        <li>Response time: &lt;200ms</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Optimized Design Parameters</p>
      <p className="font-sans text-stone-700 mb-2">For competition performance:</p>
      <p className="font-sans text-stone-700 mb-2">Granular material selection:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Ground coffee (medium grind): Excellent conformity, fast jamming transition</li>
        <li>Volume required: 80-120 cm³</li>
        <li>Density: 0.4-0.6 g/cm³</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Gripper geometry:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Base diameter: 70mm (larger than ball for good wrap-around)</li>
        <li>Depth: 40mm (sufficient volume for material)</li>
        <li>Material: Flexible silicone (Shore A 30-40 durometer)</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">System response optimization:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Minimize tube length: &lt;500mm</li>
        <li>Minimize tube diameter restrictions: 6mm minimum ID</li>
        <li>Use quick-disconnect fittings to avoid flow restrictions</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Validation Through Competition Examples</p>
      <p className="font-sans text-stone-600 mb-2">Benchmark analysis from similar competitions:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Successful granular grippers typically operate at 40-60 kPa differential</li>
        <li>Response times of 150-300ms are common</li>
        <li>Safety factors of 20-50× are typical for reliable operation</li>
      </ul>
      <p className="font-sans text-stone-700 mb-2">Our design targets:</p>
      <ul className="list-disc list-inside space-y-1 text-stone-600 mb-4">
        <li>Operating differential: 80 kPa (excellent)</li>
        <li>Response time: &lt;200ms (competitive)</li>
        <li>Safety factor: 41× (very reliable)</li>
      </ul>
      <span className="font-bold text-teal-600 text-base">These calculations confirm that all major subsystems have adequate safety margins while meeting the speed and reliability requirements for competitive performance. The design is well-balanced with no obvious weak points or over-engineered components.</span>
    </div>
  );

  return (
    <section 
      id="analysis" 
      ref={sectionRef}
      className={`mb-20 scroll-mt-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h3 className="text-3xl font-bold text-center mb-4 text-stone-900">Engineering Analysis</h3>
      <p className="text-center text-stone-600 mb-10 max-w-5xl mx-auto text-lg">
        Rigorous analysis underpins the design, ensuring structural integrity, sufficient power, and precise control. 
        The visualizations below highlight key calculations and safety margins. Click on any analysis to view the detailed formulas and methodology.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200">
          <h4 className="text-xl font-semibold mb-6 text-center text-stone-800">Mast Stability Analysis</h4>
          <div className="h-80">
            <MastChart />
          </div>
          <CalculationBlock 
            id="mast-calc"
            title="Mast Calculation"
            content={mastCalculationContent}
          />
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200">
          <h4 className="text-xl font-semibold mb-6 text-center text-stone-800">Motor Torque Analysis</h4>
          <div className="h-80">
            <MotorChart />
          </div>
          <CalculationBlock 
            id="motor-calc"
            title="Motor Calculation"
            content={motorCalculationContent}
          />
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200">
          <h4 className="text-xl font-semibold mb-6 text-center text-stone-800">Power Budget</h4>
          <div className="h-80">
            <PowerChart />
          </div>
          <CalculationBlock 
            id="power-calc"
            title="Power Calculation"
            content={powerCalculationContent}
          />
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200">
          <h4 className="text-xl font-semibold mb-6 text-center text-stone-800">Gripper Force Safety Margin</h4>
          <div className="h-80">
            <GripperChart />
          </div>
          <CalculationBlock 
            id="gripper-calc"
            title="Gripper Calculation"
            content={gripperCalculationContent}
          />
        </div>

      </div>
    </section>
  );
};

export default EngineeringAnalysis;