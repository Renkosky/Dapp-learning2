import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

// 获取项目 ID
// https://paywithcryptocurrency.net/get-walletconnect-project-id/
const projectId = "12529c26586e51f97cfed46e68b03467";

declare module "wagmi" {
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
  connectors: [
    // 使用浏览器注入方式连接以太坊钱包
    // injected(),
    // 使用 WalletConnect 连接以太坊钱包
    walletConnect({ projectId }),
    injected({
      shimDisconnect: true,
      target() {
        return {
          id: "OKXWallet",
          name: "OKX Wallet",
          provider: () => {
            if (typeof window === "undefined") return;
            console.log(window.okxwallet, "window.okxwallet");
            const ethereum = window.okxwallet;
            return ethereum;
          },
        };
      },
    }),
    injected({
      shimDisconnect: true,
      target() {
        return {
          id: "UniWallet",
          name: "Uni Wallet",
          provider: () => {
            if (typeof window.unisat === "undefined") return;
            let ethereum = window.unisat;
            window.unisat.requestAccounts().then((res) => {
              console.log(res, "res");
              //   ethereum = window.unisat;
            });
            return ethereum;
          },
        };
      },
    }),
  ],
});
