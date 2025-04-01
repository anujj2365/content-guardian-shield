
import React from 'react';
import { Shield, Search, FileText, Lock, CheckCircle, Code } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-8 w-8 text-guardian-primary" />,
    title: 'Content Registration',
    description: 'Register your content on the Ethereum blockchain for tamper-proof evidence of ownership and timestamp verification.'
  },
  {
    icon: <Search className="h-8 w-8 text-guardian-secondary" />,
    title: 'Plagiarism Detection',
    description: 'Detect plagiarism and unauthorized use with our advanced AI algorithms for text, images, and other file types.'
  },
  {
    icon: <FileText className="h-8 w-8 text-guardian-accent" />,
    title: 'IPFS Storage',
    description: 'Store your content on IPFS for decentralized and permanent access while maintaining complete ownership.'
  },
  {
    icon: <Lock className="h-8 w-8 text-guardian-primary" />,
    title: 'Smart Licensing',
    description: 'Create and manage custom licenses with blockchain-enforced terms to monetize your content safely.'
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-guardian-secondary" />,
    title: 'Ownership Verification',
    description: 'Verify content ownership with a simple search, providing transparent proof of authorship and rights.'
  },
  {
    icon: <Code className="h-8 w-8 text-guardian-accent" />,
    title: 'API Integration',
    description: 'Integrate our protection services into your existing platforms with our developer-friendly API.'
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Comprehensive Protection Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our platform combines blockchain technology with AI to provide unparalleled protection for your digital content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
