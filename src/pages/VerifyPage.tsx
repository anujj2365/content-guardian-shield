
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerificationSection from '@/components/VerificationSection';

const VerifyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-guardian-primary/10 to-transparent dark:from-guardian-primary/5 pointer-events-none -z-10"></div>
        <div className="py-16 relative">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-guardian-primary to-guardian-secondary">
              Verify Content Ownership
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Check if content has been registered and verify its ownership details on the blockchain.
            </p>
          </div>
        </div>
        <VerificationSection />
      </main>
      <Footer />
    </div>
  );
};

export default VerifyPage;
