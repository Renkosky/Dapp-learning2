import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ConnectWallet from '@/components/connect-wallet/connect-wallet';
import useHasMounted from '@/hooks/useHasMount';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const hasMounted = useHasMounted()
  const dappUrl = "http://localhost:3000/";
  const encodedDappUrl = encodeURIComponent(dappUrl);
  const deepLink = "okx://wallet/dapp/url?dappUrl=" + encodedDappUrl;
  const encodedUrl = "https://www.okx.com/download?deeplink=" + encodeURIComponent(deepLink);
  useEffect(() => {
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>


        <h1 className={styles.title}>
          Welcome to <a href=''>Fast-DApp-Cli</a>!
        </h1>
        {hasMounted && <ConnectWallet />}
        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p> */}

        <div className={styles.grid}>
          <a className={styles.card} href="https://rainbowkit.com">
            <h2>Fast-Dapp-Cli Documentation &rarr;</h2>
            <p>Learn how to customize your wallet connection flow.</p>
          </a>

          <a className={styles.card} href="https://wagmi.sh">
            <h2>wagmi Documentation &rarr;</h2>
            <p>Learn how to interact with Ethereum.</p>
          </a>

          <a className={styles.card} href="https://nextjs.org/docs">
            <h2>Next.js Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            className={styles.card}
            href="https://github.com/vercel/next.js/tree/canary/examples"
          >
            <h2>Next.js Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made By Renkosky
        </a>
      </footer>
    </div>
  );
};

export default Home;
