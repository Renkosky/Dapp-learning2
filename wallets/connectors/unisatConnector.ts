import { ConnectorNotFoundError } from 'wagmi';
import { BtcConnectorName } from '../types';
import {
  AccountsChangedHandler,
  Connector,
  ConnectorOptions,
  DisconnectHandler,
  NetworkChangedHandler,
} from './types';
export default class UnisatConnector implements Connector {
  name: BtcConnectorName;
  onAccountsChanged?: AccountsChangedHandler;
  onNetworkChanged?: NetworkChangedHandler;
  onDisconnect?: DisconnectHandler;

  constructor(options: ConnectorOptions) {
    this.name = 'Unisat';
    this.onAccountsChanged = options.onAccountsChanged;
    this.onNetworkChanged = options.onNetworkChanged;
    this.onDisconnect = options.onDisconnect;
  }

  async connect() {
    try {
      const provider = this.getProvider();
      if (!provider) {
        return { address: '', publicKey: '', network: '', balance: '' };
      }
      if (provider.on) {
        provider.on('accountsChanged', async (accounts: string[]) => {
          if (accounts.length > 0 && !accounts) {
            const publicKey = await provider.getPublicKey();
            this.onAccountsChanged &&
              this.onAccountsChanged(accounts[0], publicKey);
          } else {
            provider.removeAllListeners();
            this.onDisconnect?.();
          }
        });
        provider.on('networkChanged', (network: string) => {
          this.onNetworkChanged && this.onNetworkChanged(network as any);
        });
        provider.on('disconnect', () => {
          this.onDisconnect && this.onDisconnect();
        });
      }
      const accounts = await provider.requestAccounts();
      const publicKey = await provider.getPublicKey();
      const network = await provider.getNetwork();
      const balance = await provider.getBalance();
      return { address: accounts[0], publicKey, network, balance };
    } catch (error) {
      console.error('connnector error: ', error);
    }
    return { address: '', publicKey: '', network: '', balance: '' };
  }

  async disconnect() {
    const provider = this.getProvider();
    if (!provider) {
      return;
    }
    provider.removeListener('accountsChanged', () => {});
    provider.removeListener('networkChanged', () => {});
  }

  getProvider() {
    if (typeof window.unisat === 'undefined')
      throw new ConnectorNotFoundError();
    if (typeof window === 'undefined') return;
    return window.unisat;
  }
  async signMessage(message: string | undefined) {
    const provider = this.getProvider();
    return provider.signMessage(message) as Promise<string>;
  }
}
