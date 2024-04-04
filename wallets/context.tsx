import React, { createContext, useEffect, useReducer } from 'react';
import { Action, BtcConnectorName, Dispatch, Network, State } from './types';

export const BtcContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const BtcReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'on connect':
      return {
        ...state,
        isConnecting: true,
        connectorName: action.payload.connectorName,
      };
    case 'connected':
      return {
        ...state,
        isConnecting: false,
        connected: true,
        ...action.payload,
      };
    case 'account changed':
      return {
        ...state,
        address: action.payload.address,
        publicKey: action.payload.publicKey,
      };
    case 'network changed':
      return {
        ...state,
        network: action.payload.network,
      };
    case 'disconnected':
      return {
        ...state,
        connected: false,
        address: '',
        publicKey: '',
        connector: null,
      };
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
