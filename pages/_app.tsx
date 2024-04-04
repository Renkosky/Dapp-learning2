import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { useRouter } from 'next/router';
import { config } from '@/config/wagmiConfig';
import { BtcProvider } from '@/wallets/btcProvider';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <BtcProvider>
          <Component {...pageProps} />
        </BtcProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
