import { useReducer, useEffect } from 'react';
import { BtcContext, BtcReducer } from './context';

export const BtcProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(BtcReducer, {
    isConnecting: false,
    connected: false,
    address: '',
    publicKey: '',
    network: 'livenet',
    connectorName: undefined,
  });

  useEffect(() => {
    const store = localStorage.getItem('BTC_Connecter.store');
    if (store) {
      const value = JSON.parse(store).value;
      if (value?.connected) {
        dispatch({ type: 'connected', payload: value });
      }
    }
  }, []);

  useEffect(() => {
    if (state.connectorName) {
      localStorage.setItem(
        'BTC_Connecter.store',
        JSON.stringify({ value: state })
      );
    }
  }, [state]);
  return (
    <BtcContext.Provider value={{ state, dispatch }}>
      {children}
    </BtcContext.Provider>
  );
};
