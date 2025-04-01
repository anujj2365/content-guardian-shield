
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/hooks/use-toast';
import WalletConnectAnimation from '@/components/WalletConnectAnimation';

interface WalletContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [showConnectAnimation, setShowConnectAnimation] = useState(false);

  // Check if wallet was connected previously
  useEffect(() => {
    const storedAccount = localStorage.getItem('connectedWallet');
    if (storedAccount) {
      connectWallet();
    }
  }, []);

  // Setup event listeners when provider changes
  useEffect(() => {
    if (provider) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
          localStorage.setItem('connectedWallet', accounts[0]);
          toast({
            title: "Account Changed",
            description: `Connected to ${shortenAddress(accounts[0])}`,
          });
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        const newChainId = parseInt(chainIdHex, 16);
        setChainId(newChainId);
        window.location.reload();
      };

      const handleDisconnect = () => {
        disconnectWallet();
      };

      window.ethereum?.on('accountsChanged', handleAccountsChanged);
      window.ethereum?.on('chainChanged', handleChainChanged);
      window.ethereum?.on('disconnect', handleDisconnect);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
        window.ethereum?.removeListener('disconnect', handleDisconnect);
      };
    }
  }, [provider, account]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask browser extension to connect",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    setShowConnectAnimation(true);

    try {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethersProvider);
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      
      setAccount(accounts[0]);
      setChainId(parseInt(chainIdHex, 16));
      localStorage.setItem('connectedWallet', accounts[0]);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${shortenAddress(accounts[0])}`,
      });
    } catch (error: any) {
      console.error('Connection error:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
      setShowConnectAnimation(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    localStorage.removeItem('connectedWallet');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <WalletContext.Provider value={{
      account,
      connectWallet,
      disconnectWallet,
      isConnecting,
      chainId,
      provider
    }}>
      <WalletConnectAnimation isOpen={showConnectAnimation} />
      {children}
    </WalletContext.Provider>
  );
};

// Helper function to shorten ethereum addresses
export const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// For TypeScript to recognize ethereum object on window
declare global {
  interface Window {
    ethereum?: any;
  }
}
