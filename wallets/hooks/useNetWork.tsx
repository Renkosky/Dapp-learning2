import React, { useEffect, useState } from 'react';
import { useBtc } from './useBtc';
import { Network } from '../types';

export default function useNetWork() {
  const { getProvider } = useBtc();
  const [network, setNetWork] = useState<Network | null>();
  useEffect(() => {
    getProvider &&
      getProvider()
        ?.getNetwork()
        .then((network) => {
          setNetWork(network);
        });
  }, []);

  const switchNetwork = async (network: Network) => {
    if (!getProvider) return;
    await getProvider()?.switchNetwork(network);
    await setNetWork(network);
  };

  return {
    network,
    switchNetwork: switchNetwork,
  };
}
