
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-guardian-primary" />
              <span className="font-bold text-xl text-gray-800 dark:text-white">ContentGuardian</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Protecting digital content ownership with blockchain and AI technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
                  Content Registration
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-600 dark:text-gray-400 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
                  Ownership Verification
                </Link>
              </li>
              <li>
                <Link to="/license" className="text-gray-600 dark:text-gray-400 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
                  Content Licensing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-gray-600 dark:text-gray-400 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ContentGuardian. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
