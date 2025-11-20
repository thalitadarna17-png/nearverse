import { WalletState } from '../types';

// In a real implementation, this would import @near-wallet-selector/core and near-api-js
// For this generated output, we simulate the wallet connection for full UI functionality.

export const connectWallet = async (): Promise<WalletState> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accountId: 'traveler.testnet',
        isConnected: true,
        balanceStarl: 1500,
        balanceQuant: 50,
        nearBalance: 12.5
      });
    }, 800);
  });
};

export const disconnectWallet = async (): Promise<WalletState> => {
  return {
    accountId: null,
    isConnected: false,
    balanceStarl: 0,
    balanceQuant: 0,
    nearBalance: 0
  };
};