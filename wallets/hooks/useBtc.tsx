import React, { useCallback, useContext, useMemo } from 'react';
import { BtcContext } from '../context';
import { BtcConnectorName } from '../types';
import { Connector, ConnectorOptions } from '../connectors/types';
import UnisatConnector from '../connectors/unisatConnector';
import OKXConnector from '../connectors/okxConnector';
import useBtcContext from './useBtcContext';

export const useBtc = () => {
  const ctx = useBtcContext();
  const defaultConnectorOptions: ConnectorOptions = useMemo(
    () => ({
      onAccountsChanged: (address: string, publicKey: string) => {
        ctx.dispatch({
          type: 'account changed',
          payload: {
            address,
            publicKey,
          },
        });
      },
      onNetworkChanged: (network) => {
        ctx.dispatch({
          type: 'network changed',
          payload: { network },
        });
      },
      onDisconnect: () => {
        ctx.dispatch({ type: 'disconnected' });
      },
    }),
    [ctx]
  );

  const connectorMap: Record<BtcConnectorName, Connector> = useMemo(
    () => ({
      Unisat: new UnisatConnector(defaultConnectorOptions),
      OKX: new OKXConnector(defaultConnectorOptions),
    }),
    [defaultConnectorOptions]
  );

  const connector = useMemo(() => {
    if (!ctx.state.connectorName) return null;
    return connectorMap[ctx.state.connectorName];
  }, [connectorMap, ctx.state.connectorName]);

  const disconnect = useCallback(() => {
    ctx.dispatch({ type: 'disconnected' });
    if (connector && connector.disconnect) connector.disconnect();
  }, [connector, ctx]);

  const connect = useCallback(
    async (connectorName: BtcConnectorName) => {
      try {
        if (ctx.state.connected) {
          return;
        }
        ctx.dispatch({
          type: 'on connect',
          payload: {
            connectorName,
          },
        });

        const { address, publicKey, network } =
          await connectorMap?.[connectorName]?.connect?.();
        ctx.dispatch({
          type: 'connected',
          payload: {
            connectorName,
            address,
            publicKey,
            network,
            connector: connectorMap[connectorName],
          },
        });
      } catch (error) {
        ctx.dispatch({ type: 'connect failed' });
        throw error;
      }
    },
    [connectorMap, ctx, disconnect]
  );

  const signMessage = useCallback(
    async (message?: string) => {
      if (connector) return connector.signMessage(message);
    },
    [connector]
  );

  return {
    ...ctx.state,
    connect,
    disconnect,
    connector,
    signMessage,
    getProvider: connector?.getProvider,
  };
};
