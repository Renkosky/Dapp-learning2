import { useState } from "react"
import { useAccount, useAccountEffect } from "wagmi"
import { WalletOptions } from "../wallet-options/wallet-options"
import { Account } from "../account/account"
import Modal from "../modal/modal"

export default function ConnectWallet() {
  const { isConnected } = useAccount()
  const [modalVisible, setModalVisible] = useState(false);

  const close = () => {
    setModalVisible(false)
  }

  return (
    <>
      {isConnected ? <Account /> :
        <>
          <button onClick={() => setModalVisible(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Connect Wallet</button>
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>
            <div className="mb-4">
              <WalletOptions onConnect={close} />
            </div>
          </Modal>
        </>
      }

    </>
  )
}