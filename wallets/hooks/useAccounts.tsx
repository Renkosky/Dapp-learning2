import React, { useEffect, useState } from 'react';
import { useBtc } from './useBtc';

export default function useAccounts() {
  const { getProvider } = useBtc();
  const [accounts, setAccounts] = useState<string[] | null>();
  useEffect(() => {
    getProvider &&
      getProvider()
        ?.getAccounts()
        .then((accounts) => {
          setAccounts(accounts);
        });
  }, []);
  return { accounts };
}
