import React from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import Challenge from './components/Challenge';
import SystemDesign from './components/SystemDesign';
import EngineeringAnalysis from './components/EngineeringAnalysis';
import Performance from './components/Performance';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-stone-50 text-stone-800">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-7xl">
        <Overview />
        <Challenge />
        <SystemDesign />
        <EngineeringAnalysis />
        <Performance />
      </main>
      <Footer />
    </div>
  );
}

export default App;