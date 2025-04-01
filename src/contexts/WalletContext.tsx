
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/hooks/use-toast';
import WalletConnectAnimation from '@/components/WalletConnectAnimation';
import WalletConnectProvider from "@walletconnect/web3-provider";

interface WalletContextType {
  account: string | null;
  connectWallet: (walletType: 'metamask' | 'walletconnect') => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  walletType: 'metamask' | 'walletconnect' | null;
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
  const [walletType, setWalletType] = useState<'metamask' | 'walletconnect' | null>(null);
  const [wcProvider, setWcProvider] = useState<WalletConnectProvider | null>(null);

  // Check if wallet was connected previously
  useEffect(() => {
    const storedAccount = localStorage.getItem('connectedWallet');
    const storedWalletType = localStorage.getItem('walletType');
    
    if (storedAccount && storedWalletType) {
      connectWallet(storedWalletType as 'metamask' | 'walletconnect');
    }
  }, []);

  // Handle events for MetaMask
  useEffect(() => {
    if (provider && walletType === 'metamask') {
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
  }, [provider, account, walletType]);

  // WalletConnect event handlers
  useEffect(() => {
    if (wcProvider) {
      wcProvider.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          localStorage.setItem('connectedWallet', accounts[0]);
          toast({
            title: "Account Changed",
            description: `Connected to ${shortenAddress(accounts[0])}`,
          });
        }
      });

      wcProvider.on("chainChanged", (chainId: number) => {
        setChainId(chainId);
        window.location.reload();
      });

      wcProvider.on("disconnect", () => {
        disconnectWallet();
      });

      return () => {
        wcProvider.removeListener("accountsChanged", () => {});
        wcProvider.removeListener("chainChanged", () => {});
        wcProvider.removeListener("disconnect", () => {});
      };
    }
  }, [wcProvider]);

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask browser extension to connect",
        variant: "destructive",
      });
      setIsConnecting(false);
      setShowConnectAnimation(false);
      return;
    }

    try {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethersProvider);
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      
      setAccount(accounts[0]);
      setChainId(parseInt(chainIdHex, 16));
      localStorage.setItem('connectedWallet', accounts[0]);
      localStorage.setItem('walletType', 'metamask');
      setWalletType('metamask');
      
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
    }
  };

  const connectWalletConnect = async () => {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Ethereum Mainnet
          137: "https://polygon-rpc.com", // Polygon Mainnet
          56: "https://bsc-dataseed.binance.org", // BSC Mainnet
          // Add more chains as needed
        },
      });
      
      setWcProvider(walletConnectProvider);
      
      // Enable session (triggers QR Code modal)
      await walletConnectProvider.enable();
      
      const ethersProvider = new ethers.providers.Web3Provider(walletConnectProvider);
      setProvider(ethersProvider);
      
      const accounts = await ethersProvider.listAccounts();
      const network = await ethersProvider.getNetwork();
      
      setAccount(accounts[0]);
      setChainId(network.chainId);
      localStorage.setItem('connectedWallet', accounts[0]);
      localStorage.setItem('walletType', 'walletconnect');
      setWalletType('walletconnect');
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${shortenAddress(accounts[0])}`,
      });
    } catch (error: any) {
      console.error('WalletConnect error:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const connectWallet = async (type: 'metamask' | 'walletconnect') => {
    setIsConnecting(true);
    setShowConnectAnimation(true);

    if (type === 'metamask') {
      await connectMetaMask();
    } else if (type === 'walletconnect') {
      await connectWalletConnect();
    }

    setIsConnecting(false);
    setShowConnectAnimation(false);
  };

  const disconnectWallet = () => {
    if (walletType === 'walletconnect' && wcProvider) {
      wcProvider.disconnect();
      setWcProvider(null);
    }
    
    setAccount(null);
    setChainId(null);
    setWalletType(null);
    localStorage.removeItem('connectedWallet');
    localStorage.removeItem('walletType');
    
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
      provider,
      walletType
    }}>
      <WalletConnectAnimation isOpen={showConnectAnimation} walletType={walletType} />
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
