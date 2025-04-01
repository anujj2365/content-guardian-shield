
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-guardian-primary blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-guardian-secondary blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Protect Your Digital <span className="gradient-text">Content Ownership</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Secure your intellectual property with our AI-powered content protection system. 
              Register your work on the blockchain, detect plagiarism, and license your content safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-guardian-primary hover:bg-guardian-accent text-white"
                asChild
              >
                <Link to="/register" className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Register Content
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-guardian-primary text-guardian-primary hover:bg-guardian-primary/10"
                asChild
              >
                <Link to="/verify" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Verify Ownership
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-guardian-primary to-guardian-secondary text-white flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Trusted by creators worldwide</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Join thousands of content creators</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative animate-fade-in">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 gradient-border rounded-2xl"></div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-guardian-primary" />
                    <span className="font-semibold">Content Registration</span>
                  </div>
                  <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs font-medium">
                    Secured
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse-slow"></div>
                  <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse-slow"></div>
                  <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg w-1/2 animate-pulse-slow"></div>
                </div>
                
                <div className="mt-6 flex items-center text-sm">
                  <FileText className="h-4 w-4 text-guardian-secondary mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">Content registered on Ethereum blockchain</span>
                </div>
              </div>
            </div>
            
            {/* Decorative small cards */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 transform rotate-6 hidden lg:block">
              <div className="h-full bg-gradient-to-br from-guardian-primary/20 to-guardian-secondary/20 rounded flex items-center justify-center">
                <Shield className="h-8 w-8 text-guardian-primary" />
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 transform -rotate-12 hidden lg:block">
              <div className="h-full bg-gradient-to-br from-guardian-accent/20 to-guardian-secondary/20 rounded flex items-center justify-center">
                <FileText className="h-8 w-8 text-guardian-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
