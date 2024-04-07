import { useState } from 'react';
import { useAccount, useAccountEffect } from 'wagmi';
import { WalletOptions } from '../wallet-options/wallet-options';
import { Account } from '../account/account';
import Modal from '../modal/modal';
import { useBtc } from '@/wallets/hooks/useBtc';
import { BtcAccount } from '../btc-account/btc-account';

export default function ConnectWalletBtn() {
  const { isConnected } = useAccount();
  const [modalVisible, setModalVisible] = useState(false);
  const { connected: btcConnected } = useBtc();
  const close = () => {
    setModalVisible(false);
  };
  if (btcConnected) {
    return <BtcAccount />;
  }
  return (
    <>
      {isConnected ? (
        <Account />
      ) : (
        <>
          <button
            onClick={() => setModalVisible(true)}
            className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            Connect Wallet
          </button>
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <h2 className='mb-4 text-xl font-semibold'>Connect Wallet</h2>
            <div className='mb-4'>
              <WalletOptions onConnect={close} />
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
