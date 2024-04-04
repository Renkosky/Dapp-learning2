import React, { useEffect, useState } from 'react';
import { BtcContext } from '../context';
import useBtcContext from './useBtcContext';
import { useBtc } from './useBtc';
import { Balance } from '../connectors/types';

export default function useBalance() {
  const { getProvider } = useBtc();
  const [balance, setBalance] = useState<Balance | null>();
  useEffect(() => {
    getProvider &&
      getProvider()
        ?.getBalance()
        .then((balance) => {
          setBalance(balance);
        });
  }, []);
  return { balance };
}
