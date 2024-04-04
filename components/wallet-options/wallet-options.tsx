import { useBtc } from '@/wallets/hooks/useBtc';
import { injected } from '@wagmi/core';
import * as React from 'react';
import { Connector, useAccount, useAccountEffect, useConnect } from 'wagmi';

const icons = {
  walletConnect:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjM0I5OUZDIi8+CjxwYXRoIGQ9Ik04LjM4OTY5IDEwLjM3MzlDMTEuNDg4MiA3LjI3NTM4IDE2LjUxMTggNy4yNzUzOCAxOS42MTAzIDEwLjM3MzlMMTkuOTgzMiAxMC43NDY4QzIwLjEzODIgMTAuOTAxNyAyMC4xMzgyIDExLjE1MjkgMTkuOTgzMiAxMS4zMDc4TDE4LjcwNzYgMTIuNTgzNUMxOC42MzAxIDEyLjY2MDkgMTguNTA0NSAxMi42NjA5IDE4LjQyNzEgMTIuNTgzNUwxNy45MTM5IDEyLjA3MDNDMTUuNzUyMyA5LjkwODcgMTIuMjQ3NyA5LjkwODcgMTAuMDg2MSAxMi4wNzAzTDkuNTM2NTUgMTIuNjE5OEM5LjQ1OTA5IDEyLjY5NzMgOS4zMzM1IDEyLjY5NzMgOS4yNTYwNCAxMi42MTk4TDcuOTgwMzkgMTEuMzQ0MkM3LjgyNTQ3IDExLjE4OTMgNy44MjU0NyAxMC45MzgxIDcuOTgwMzkgMTAuNzgzMkw4LjM4OTY5IDEwLjM3MzlaTTIyLjI0ODUgMTMuMDEyTDIzLjM4MzggMTQuMTQ3NEMyMy41Mzg3IDE0LjMwMjMgMjMuNTM4NyAxNC41NTM1IDIzLjM4MzggMTQuNzA4NEwxOC4yNjQ1IDE5LjgyNzdDMTguMTA5NiAxOS45ODI3IDE3Ljg1ODQgMTkuOTgyNyAxNy43MDM1IDE5LjgyNzdDMTcuNzAzNSAxOS44Mjc3IDE3LjcwMzUgMTkuODI3NyAxNy43MDM1IDE5LjgyNzdMMTQuMDcwMiAxNi4xOTQ0QzE0LjAzMTQgMTYuMTU1NyAxMy45Njg2IDE2LjE1NTcgMTMuOTI5OSAxNi4xOTQ0QzEzLjkyOTkgMTYuMTk0NCAxMy45Mjk5IDE2LjE5NDQgMTMuOTI5OSAxNi4xOTQ0TDEwLjI5NjYgMTkuODI3N0MxMC4xNDE3IDE5Ljk4MjcgOS44OTA1MyAxOS45ODI3IDkuNzM1NjEgMTkuODI3OEM5LjczNTYgMTkuODI3OCA5LjczNTYgMTkuODI3NyA5LjczNTYgMTkuODI3N0w0LjYxNjE5IDE0LjcwODNDNC40NjEyNyAxNC41NTM0IDQuNDYxMjcgMTQuMzAyMiA0LjYxNjE5IDE0LjE0NzNMNS43NTE1MiAxMy4wMTJDNS45MDY0NSAxMi44NTcgNi4xNTc2MyAxMi44NTcgNi4zMTI1NSAxMy4wMTJMOS45NDU5NSAxNi42NDU0QzkuOTg0NjggMTYuNjg0MSAxMC4wNDc1IDE2LjY4NDEgMTAuMDg2MiAxNi42NDU0QzEwLjA4NjIgMTYuNjQ1NCAxMC4wODYyIDE2LjY0NTQgMTAuMDg2MiAxNi42NDU0TDEzLjcxOTQgMTMuMDEyQzEzLjg3NDMgMTIuODU3IDE0LjEyNTUgMTIuODU3IDE0LjI4MDUgMTMuMDEyQzE0LjI4MDUgMTMuMDEyIDE0LjI4MDUgMTMuMDEyIDE0LjI4MDUgMTMuMDEyTDE3LjkxMzkgMTYuNjQ1NEMxNy45NTI2IDE2LjY4NDEgMTguMDE1NCAxNi42ODQxIDE4LjA1NDEgMTYuNjQ1NEwyMS42ODc0IDEzLjAxMkMyMS44NDI0IDEyLjg1NzEgMjIuMDkzNiAxMi44NTcxIDIyLjI0ODUgMTMuMDEyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==',
} as Record<string, string>;

export default function Loading() {
  return (
    <div className='h-full w-full animate-spin rounded-full border-b-2 border-t-2 border-gray-900 '></div>
  );
}
interface WalletOptionsProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
}
export function WalletOptions(props: WalletOptionsProps) {
  //连接器列表和连接方法
  const { connectors, connect } = useConnect();
  const [loading, setLoading] = React.useState('');
  const { status } = useAccount();
  console.log(connectors, 'connectors');

  const renderIcon = (connector: Connector | void) => {
    if (!connector) return <div className='mr-2 h-7 w-7' />;
    if (icons[connector.id]) {
      return (
        <div
          style={{ backgroundImage: `url(${icons[connector.id]})` }}
          className='mr-2 h-7 w-7 rounded'
        />
      );
    }
    return connector.icon ? (
      <img src={connector.icon} alt={connector.name} className='mr-2 h-7 w-7' />
    ) : (
      <div className='mr-2 h-7 w-7' />
    );
  };

  const connectChain = async (connector: Connector) => {
    setLoading(connector.name);
    connect({ connector });
  };

  useAccountEffect({
    onConnect(data) {
      setLoading('');
      console.log('Connected!', data);
      props?.onConnect && props.onConnect();
    },
    onDisconnect() {
      setLoading('');
      props?.onDisconnect && props.onDisconnect();
    },
  });

  const { connect: btcConnect, isConnecting } = useBtc();

  return (
    <>
      {connectors.map((connector: Connector) => (
        <div
          key={connector.uid}
          className='flex cursor-pointer flex-row items-center rounded p-1 hover:bg-slate-400 hover:text-white'
          onClick={() => {
            connectChain(connector);
          }}
        >
          {renderIcon(connector)}
          <span className='mr-2 font-bold'>{connector.name}</span>
          <div className='h-4 w-4'>
            {loading === connector.name && status === 'connecting' && (
              <Loading />
            )}
          </div>
        </div>
      ))}
      <div
        className='flex cursor-pointer flex-row items-center rounded p-1 hover:bg-slate-400 hover:text-white'
        onClick={() => btcConnect('Unisat')}
      >
        {renderIcon()}

        <span className='mr-2 font-bold'>Unisat</span>
        <div className='h-4 w-4'>{isConnecting && <Loading />}</div>
      </div>
      <div
        className='flex cursor-pointer flex-row items-center rounded p-1 hover:bg-slate-400 hover:text-white'
        onClick={() => btcConnect('OKX')}
      >
        {renderIcon()}
        <span className='mr-2 font-bold'>OKX (by btcConnector)</span>
        <div className='h-4 w-4'>{isConnecting && <Loading />}</div>
      </div>
    </>
  );
}
