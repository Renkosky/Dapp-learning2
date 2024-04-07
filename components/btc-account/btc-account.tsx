import React, { useState } from 'react';
import Modal from '../modal/modal';
import { useBtc } from '@/wallets/hooks/useBtc';
import useBalance from '@/wallets/hooks/useBalance';
import useNetWork from '@/wallets/hooks/useNetWork';
import useAccounts from '@/wallets/hooks/useAccounts';
const netWorks = ['livenet', 'testnet'] as const;
export function BtcAccount() {
  const { address, disconnect, getProvider } = useBtc();
  const [show, setShow] = useState(false);
  const { balance } = useBalance();
  const { accounts } = useAccounts();
  const { network, switchNetwork } = useNetWork();
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    alert('Copied to clipboard');
  };

  return (
    <div className='flex gap-2'>
      {network && (
        <button
          onClick={() => setShow(true)}
          className='rounded bg-blue-600 px-2 text-white'
        >
          {network}
        </button>
      )}
      {/* {ensAvatar && <img alt='ENS Avatar' src={ensAvatar} />} */}
      {address && (
        <div className='cursor-pointer font-bold' onClick={copyAddress}>
          👽{shortAddress}
        </div>
      )}
      {balance && (
        <div>
          BTC: <span className=' text-gray-400'>{balance.total}</span>
        </div>
      )}
      <button
        onClick={() => disconnect()}
        className=' rounded bg-red-600 px-2 text-white'
      >
        Disconnect
      </button>
      <Modal visible={show} onClose={() => setShow(false)}>
        <h2 className='mb-4 text-xl font-semibold'>Switch Network</h2>
        <div className='flex flex-col gap-2'>
          {netWorks?.map((net) => (
            <div key={net} className='flex justify-between'>
              <button
                className={`flex w-full  justify-between rounded p-2 text-neutral-900 ${net === network ? 'bg-sky-500 !text-white' : 'transition-all hover:bg-slate-400 hover:bg-opacity-35 hover:text-white '} `}
                onClick={async () => {
                  await switchNetwork(net);
                  setShow(false);
                }}
              >
                <span>{net}</span>
                <span
                  className='align-middle text-sm'
                  style={{ lineHeight: '1.5rem' }}
                >
                  {net === network ? 'Connected' : ''}
                </span>
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
