
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock, FileText } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-guardian-primary" />
          <span className="font-bold text-xl text-gray-800 dark:text-white">ContentGuardian</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
            Home
          </Link>
          <Link to="/register" className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
            Register Content
          </Link>
          <Link to="/verify" className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
            Verify Ownership
          </Link>
          <Link to="/license" className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors">
            License
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <Lock className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
          <Button className="hidden md:flex items-center gap-1 bg-guardian-primary hover:bg-guardian-accent text-white">
            <FileText className="h-4 w-4" />
            <span>My Content</span>
          </Button>
          
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
