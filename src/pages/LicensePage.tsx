
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LicensingSection from '@/components/LicensingSection';

const LicensePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">License Your Content</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create blockchain-enforced licenses for your content to manage usage rights and monetization.
            </p>
          </div>
        </div>
        <LicensingSection />
      </main>
      <Footer />
    </div>
  );
};

export default LicensePage;
