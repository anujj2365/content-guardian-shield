
import React, { useEffect, useRef } from 'react';
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.step-item');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('fade-in-up');
            }, index * 200);
          });
        }
      });
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-3xl mx-4 md:mx-8 lg:mx-16 shadow-lg border border-white/10 dark:border-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white gradient-text">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our platform makes it easy to protect and manage your content ownership in just a few simple steps.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="step-item flex items-start md:items-center mb-12 last:mb-0 opacity-0" style={{animationDelay: `${index * 0.2}s`}}>
              <div className={`${step.color} rounded-full p-3 flex items-center justify-center shrink-0 relative group transition-all duration-300 hover:scale-110`}>
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                {step.icon}
              </div>
              
              <div className="ml-4 md:ml-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                  <span className="inline-block mr-2 text-sm font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full h-6 w-6 flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
                    {step.number}
                  </span>
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl">
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
