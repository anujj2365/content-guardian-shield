
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import ContentRegistrationSection from '@/components/ContentRegistrationSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-guardian-primary/10 to-transparent dark:from-guardian-primary/5 pointer-events-none -z-10"></div>
        <HeroSection />
        <FeatureSection />
        <div className="py-20 w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-guardian-secondary/10 to-transparent dark:from-guardian-secondary/5 pointer-events-none -z-10"></div>
          <HowItWorks />
        </div>
        <ContentRegistrationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
