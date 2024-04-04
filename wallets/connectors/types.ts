import { BtcConnectorName, Network } from '../types';

export type AccountsChangedHandler = (
  address: string,
  publicKey: string
) => void;

export type NetworkChangedHandler = (network: Network) => void;
export type DisconnectHandler = () => void;

export interface ConnectorOptions {
  onAccountsChanged?: AccountsChangedHandler;
  onNetworkChanged?: NetworkChangedHandler;
  onDisconnect?: DisconnectHandler;
}

export interface Connection {
  address: string;
  publicKey: string;
  network: Network;
}

type Inscription = {
  inscriptionId: string;
  inscriptionNumber: string;
  address: string;
  outputValue: string;
  contentLength: string;
  contentType: number | string;
  timestamp: number | string;
  offset: number | string;
  output: string;
  genesisTransaction: string;
  location: string;
};
export type Balance = {
  confirmed: number;
  unconfirmed: number;
  total: number;
};

interface Methods {
  getBalance: () => Promise<Balance>;
  switchNetwork: (network: Network) => void;
  getAccounts: () => Promise<string[]>;
  getInscriptions: (
    cursor?: number,
    size?: number
  ) => Promise<{ total: number; list: Inscription[] }>;
  getNetwork: () => Promise<Network>;
}

export interface Connector {
  name: BtcConnectorName;
  getProvider: () => Methods | undefined;
  connect: (options?: ConnectorOptions) => Promise<Connection>;
  disconnect: () => void;
  signMessage: (message: string | undefined) => Promise<string>;
}
