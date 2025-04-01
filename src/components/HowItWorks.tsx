
import React from 'react';
import { Upload, Shield, Search, Link } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: <Upload className="h-6 w-6 text-white" />,
    title: 'Upload Your Content',
    description: 'Upload your text, images, or files to our secure platform for registration or verification.',
    color: 'bg-guardian-primary'
  },
  {
    number: 2,
    icon: <Shield className="h-6 w-6 text-white" />,
    title: 'Register Ownership',
    description: 'We store your content on IPFS and record ownership details on the Ethereum blockchain.',
    color: 'bg-guardian-secondary'
  },
  {
    number: 3,
    icon: <Search className="h-6 w-6 text-white" />,
    title: 'Detect Plagiarism',
    description: 'Our AI algorithms compare your content with others to detect unauthorized use.',
    color: 'bg-guardian-accent'
  },
  {
    number: 4,
    icon: <Link className="h-6 w-6 text-white" />,
    title: 'License Content',
    description: 'Create and manage licenses for your content with blockchain-enforced terms.',
    color: 'bg-guardian-primary'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our platform makes it easy to protect and manage your content ownership in just a few simple steps.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start md:items-center mb-12 last:mb-0">
              <div className={`${step.color} rounded-full p-3 flex items-center justify-center shrink-0`}>
                {step.icon}
              </div>
              
              <div className="ml-4 md:ml-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                  <span className="inline-block mr-2 text-sm font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full h-6 w-6 flex items-center justify-center">
                    {step.number}
                  </span>
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
