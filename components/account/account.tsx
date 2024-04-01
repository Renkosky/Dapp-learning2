import React, { useState } from 'react'
import { useAccount, useBalance, useChains, useDisconnect, useEnsAvatar, useEnsName, useSwitchChain } from 'wagmi'
import Modal from '../modal/modal'
import { Chain } from 'wagmi/chains'

export function Account() {
  const { address, status, chain: currentChain } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const { chains, switchChain } = useSwitchChain()
  const [show, setShow] = useState(false)
  const balance = useBalance({ address })
  const isChainActived = (chain: Chain) => currentChain?.name === chain.name
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  return (
    <div className='flex gap-2'>
      {currentChain && <button onClick={() => setShow(true)} className='bg-blue-600 text-white rounded px-2'>{currentChain.name}</button>}
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div className='font-bold'>👽{ensName ? `${ensName} (${shortAddress})` : shortAddress}</div>}
      {balance && <div>{balance.data?.symbol}: <span className=' text-gray-400'>{balance.data?.decimals}</span></div>}
      <button onClick={() => disconnect()} className=' bg-red-600 text-white rounded px-2'>Disconnect</button>
      <Modal visible={show} onClose={() => setShow(false)}>
        <h2 className='text-xl font-semibold mb-4'>Switch Chain</h2>
        <div className='flex flex-col gap-2'>
          {chains?.map((chain) => (
            <div key={chain.id} className='flex justify-between'>
              <button
                className={`flex justify-between  w-full p-2 text-neutral-900 rounded ${isChainActived(chain) ? 'bg-sky-500 !text-white' : 'hover:bg-opacity-35 hover:bg-slate-400 transition-all hover:text-white '} `}
                onClick={() => switchChain({ chainId: chain.id as any }, { onSuccess: () => setShow(false) })}>
                <span>{chain.name}</span>
                <span className='text-sm align-middle' style={{ lineHeight: '1.5rem' }}>
                  {isChainActived(chain) ? 'Connected' : ''}
                </span>
              </button>
              {/* 连接状态*/}

            </div>

          ))}
        </div>
      </Modal>
    </div>
  )
}