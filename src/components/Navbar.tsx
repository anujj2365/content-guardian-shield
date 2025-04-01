
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock, FileText, Menu, X } from "lucide-react";
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`w-full backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 dark:bg-gray-900/90 shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 z-10 group">
          <div className="relative">
            <Shield className="h-7 w-7 text-guardian-primary dark:text-guardian-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-guardian-primary/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
          <span className="font-bold text-xl text-gray-800 dark:text-white">
            <span className="gradient-text">Content</span>Guardian
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-guardian-primary after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">
            Home
          </Link>
          <Link to="/register" className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-guardian-primary after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">
            Register Content
          </Link>
          <Link to="/verify" className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-guardian-primary after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">
            Verify Ownership
          </Link>
          <Link to="/license" className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-guardian-primary after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">
            License
          </Link>
        </div>

        <div className="flex items-center space-x-3 z-10">
          <ThemeSwitcher />
          
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1 border-guardian-primary/50 hover:border-guardian-primary text-guardian-primary hover:bg-guardian-primary/10 dark:border-guardian-primary/70 dark:text-guardian-primary transition-all duration-300 hover:scale-105">
            <Lock className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
          
          <Button className="hidden md:flex items-center gap-1 bg-gradient-to-r from-guardian-primary to-guardian-secondary hover:opacity-90 text-white transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
            <FileText className="h-4 w-4" />
            <span>My Content</span>
          </Button>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 shadow-md flex flex-col space-y-4 slide-in-right">
          <Link 
            to="/" 
            className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/register" 
            className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Register Content
          </Link>
          <Link 
            to="/verify" 
            className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Verify Ownership
          </Link>
          <Link 
            to="/license" 
            className="text-gray-700 dark:text-gray-300 hover:text-guardian-primary dark:hover:text-guardian-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            License
          </Link>
          <div className="pt-2 flex flex-col space-y-3">
            <Button variant="outline" className="w-full justify-center items-center gap-1 border-guardian-primary/50 hover:border-guardian-primary">
              <Lock className="h-4 w-4" />
              <span>Connect Wallet</span>
            </Button>
            <Button className="w-full justify-center items-center gap-1 bg-gradient-to-r from-guardian-primary to-guardian-secondary hover:opacity-90 relative overflow-hidden group">
              <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
              <FileText className="h-4 w-4" />
              <span>My Content</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
