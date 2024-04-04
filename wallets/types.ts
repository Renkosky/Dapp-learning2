import { createContext } from 'react';
import { Connector } from './connectors/types';

export type BtcConnectorName = 'Unisat' | 'OKX';
export type Network = 'livenet' | 'testnet';
export type Action =
  | { type: 'on connect'; payload: { connectorName: BtcConnectorName } }
  | { type: 'connect failed' }
  | {
      type: 'connected';
      payload: {
        connectorName: BtcConnectorName;
        address: string;
        publicKey: string;
        network: Network;
        connector: Connector;
      };
    }
  | { type: 'account changed'; payload: { address: string; publicKey: string } }
  | { type: 'network changed'; payload: { network: Network } }
  | { type: 'disconnected' };

export type Dispatch = (action: Action) => void;

export interface State {
  isConnecting: boolean;
  connected: boolean;
  address: string;
  network?: Network;
  connectorName?: BtcConnectorName;
  connector?: Connector | null;
}
