import { BtcConnectorName } from '../types';
import { ConnectorNotFoundError } from './error';
import { Connector, ConnectorOptions } from './types';

export default class OKXConnector implements Connector {
  name: BtcConnectorName;
  onAccountsChanged?: any;
  onNetworkChanged?: any;
  onDisconnect?: any;

  constructor(options: ConnectorOptions) {
    this.name = 'OKX';
    this.onAccountsChanged = options.onAccountsChanged;
    this.onNetworkChanged = options.onNetworkChanged;
    this.onDisconnect = options.onDisconnect;
  }
  async connect() {
    const okxwallet = this.getProvider();
    try {
      const accounts = await okxwallet.bitcoin.requestAccounts();
      const publicKey = await okxwallet.bitcoin.getPublicKey();
      const network = await okxwallet.bitcoin.getNetwork();
      const balance = await okxwallet.bitcoin.getBalance();
      return { address: accounts[0], publicKey, network, balance };
    } catch (e) {
      console.log('connect failed');
    }
    return { address: '', publicKey: '', network: '', balance: '' };
  }
  getProvider() {
    if (typeof window === 'undefined') return;
    if (typeof window.okxwallet === 'undefined') {
      throw new ConnectorNotFoundError();
    }
    return window.okxwallet;
  }

  disconnect() {
    const okxwallet = this.getProvider();
    okxwallet.bitcoin.removeListener('accountsChanged', () => {});
    okxwallet.bitcoin.removeListener('networkChanged', () => {});
  }
  signMessage(message: string | undefined) {
    const okxwallet = this.getProvider();
    return okxwallet.bitcoin.signMessage(message);
  }
}
