import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

// 获取项目 ID
// https://paywithcryptocurrency.net/get-walletconnect-project-id/
const projectId = '12529c26586e51f97cfed46e68b03467';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
//mainnet 以太坊主链
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    // 为 mainnet 链配置 HTTP 传输方式
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [walletConnect({ projectId })],
});
