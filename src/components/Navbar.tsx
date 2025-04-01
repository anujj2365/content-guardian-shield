
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock, FileText, Menu, X, Wallet, LogOut } from "lucide-react";
import ThemeSwitcher from './ThemeSwitcher';
import { useWallet, shortenAddress } from '@/contexts/WalletContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="w-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 z-10">
          <Shield className="h-7 w-7 text-guardian-primary dark:text-guardian-primary" />
          <span className="font-bold text-xl text-gray-800 dark:text-white">
            <span className="gradient-text">Content</span>Guardian
          </span>
        </Link>

        {/* Desktop menu */}
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

        <div className="flex items-center space-x-3 z-10">
          <ThemeSwitcher />
          
          {!account ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex items-center gap-1 border-guardian-primary/50 hover:border-guardian-primary text-guardian-primary hover:bg-guardian-primary/10 dark:border-guardian-primary/70 dark:text-guardian-primary"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              <Wallet className="h-4 w-4" />
              <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </Button>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full text-sm font-medium bg-guardian-primary/10 text-guardian-primary border border-guardian-primary/20">
                {shortenAddress(account)}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={disconnectWallet}
                className="text-gray-500 hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <Button className="hidden md:flex items-center gap-1 bg-gradient-to-r from-guardian-primary to-guardian-secondary hover:opacity-90 text-white">
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 p-4 shadow-md flex flex-col space-y-4 animate-fade-in">
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
            {!account ? (
              <Button 
                variant="outline" 
                className="w-full justify-center items-center gap-1 border-guardian-primary/50 hover:border-guardian-primary"
                onClick={() => {
                  connectWallet();
                  setIsMenuOpen(false);
                }}
                disabled={isConnecting}
              >
                <Wallet className="h-4 w-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </Button>
            ) : (
              <div className="flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-full text-sm font-medium bg-guardian-primary/10 text-guardian-primary border border-guardian-primary/20">
                  {shortenAddress(account)}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button 
              className="w-full justify-center items-center gap-1 bg-gradient-to-r from-guardian-primary to-guardian-secondary hover:opacity-90"
              onClick={() => setIsMenuOpen(false)}
            >
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
