import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ConnectWallet from '@/components/connect-wallet-btn/connect-wallet-btn';
import useHasMounted from '@/hooks/useHasMount';
import { useEffect } from 'react';
import { ethers } from 'ethers';
const Home: NextPage = () => {
  const hasMounted = useHasMounted();
  // 利用公共rpc节点连接以太坊网络
  // 可以在 https://chainlist.org 上找到
  const ALCHEMY_SEPOLIA_URL = 'https://rpc.sepolia.org';
  // 连接以太坊主网
  const ALCHEMY_MAINNET_URL =
    'https://eth-mainnet.g.alchemy.com/v2/6YKKbJvfdb2ms--Jx_b8UPapEz1MR5VJ';
  const providerETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
  // 连接Sepolia测试网
  const providerSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
  // 利用Infura的rpc节点连接以太坊网络
  // 准备Infura API Key, 教程：https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL02_Infura/readme.md
  const INFURA_ID = 'ed5b0f1b62784c8eb4cf5e2efdb834b6';
  // 连接以太坊主网
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/ed5b0f1b62784c8eb4cf5e2efdb834b6`
  );
  const abiERC20 = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint)',
  ];
  const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI Contract
  //可读Contract
  const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider);

  // const abiWETH =
  //   '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view"}]';
  // const addressWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // WETH Contract
  // const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider);

  const main = async () => {
    const nameDAI = await contractDAI.name();
    const symbolDAI = await contractDAI.symbol();
    const totalSupplDAI = await contractDAI.totalSupply();
    console.log('\n2. 读取DAI合约信息');
    console.log(`合约地址: ${addressDAI}`);
    console.log(`名称: ${nameDAI}`);
    console.log(`代号: ${symbolDAI}`);
    console.log(`总供给: ${ethers.formatEther(totalSupplDAI)}`);
    const balanceDAI = await contractDAI.balanceOf('vitalik.eth');
    console.log(`Vitalik持仓: ${ethers.formatEther(balanceDAI)}\n`);
    console.log('2. 读取DAI结束\n');

    const wallet1 = ethers.Wallet.createRandom();
    console.log(wallet1, '钱包对象');
    const address1 = await wallet1.getAddress();
    console.log(`钱包1地址: ${address1}`);
    console.log(`钱包1助记词: ${wallet1?.mnemonic?.phrase}`);
  };

  const getBalance = async () => {
    // 1. 查询vitalik在主网和Sepolia测试网的ETH余额
    console.log('1. 查询vitalik在主网和Sepolia测试网的ETH余额');
    const balance = await providerETH.getBalance(`vitalik.eth`);
    // const balanceSepolia = await providerSepolia.getBalance(
    //   `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
    // );
    // 将余额输出在console（主网）
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
    // 输出Sepolia测试网ETH余额
    // console.log(
    //   `Sepolia ETH Balance of vitalik: ${ethers.formatEther(balanceSepolia)} ETH`
    // );
  };

  const getBlock = () => {
    providerETH.getBlockNumber().then((blockNumber) => {
      console.log('\n3. 查询区块高度');
      console.log(blockNumber);
    });
  };

  const writeContract = async () => {
    // 利用Alchemy的rpc节点连接以太坊网络
    const ALCHEMY_GOERLI_URL =
      'https://goerli.infura.io/v3/ed5b0f1b62784c8eb4cf5e2efdb834b6';
    const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

    // 利用私钥和provider创建wallet对象
    const privateKey =
      '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b';
    const wallet = new ethers.Wallet(privateKey, provider);
    // WETH的ABI
    const abiWETH = [
      'function balanceOf(address) public view returns(uint)',
      'function deposit() public payable',
      'function transfer(address, uint) public returns (bool)',
      'function withdraw(uint) public',
    ];
    // WETH合约地址（Goerli测试网）
    const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'; // WETH Contract
    const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);
    const address = await wallet.getAddress();
    // 读取WETH合约的链上信息（WETH abi）
    console.log('\n1. 读取WETH余额');
    const balanceWETH = await contractWETH.balanceOf(address);
    console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
  };

  const deployContract = async () => {
    // 利用Alchemy的rpc节点连接以太坊网络
    // 连接goerli测试网
    const ALCHEMY_GOERLI_URL =
      'https://goerli.infura.io/v3/ed5b0f1b62784c8eb4cf5e2efdb834b6';
    const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

    // 利用私钥和provider创建wallet对象
    const privateKey = 'xxx';
    const wallet = new ethers.Wallet(privateKey, provider);
    const abiERC20 = [
      'constructor(string memory name_, string memory symbol_)',
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function totalSupply() view returns (uint256)',
      'function balanceOf(address) view returns (uint)',
      'function transfer(address to, uint256 amount) external returns (bool)',
      'function mint(uint amount) external',
    ];
    const byteCodeErc20 = '';

    const factoryErc20 = new ethers.ContractFactory(
      abiERC20,
      byteCodeErc20,
      wallet
    );
    // 1. 利用contractFactory部署ERC20代币合约
    console.log('\n1. 利用contractFactory部署ERC20代币合约');
    // 部署合约，填入constructor的参数
    const contractERC20 = await factoryErc20.deploy('WTF Token', 'WTF');
    console.log(`合约地址: ${contractERC20.target}`);
    console.log('部署合约的交易详情');
    console.log(contractERC20.deploymentTransaction());
    console.log('\n等待合约部署上链');
    await contractERC20.waitForDeployment();
    // 也可以用 contractERC20.deployTransaction.wait()
    console.log('合约已上链');
  };

  const sendEth = async () => {
    const wallet1 = new ethers.Wallet('xxx', provider);
    const privateKey = 'xxx';
    const wallet2 = new ethers.Wallet(privateKey, provider);
    const address1 = await wallet1.getAddress();
    const address2 = await wallet2.getAddress();
    console.log(`钱包1地址: ${address1}`);
    console.log(`钱包2地址: ${address2}`);
    console.log(`\n5. 发送ETH（测试网）`);
    // i. 打印交易前余额
    console.log(`i. 发送前余额`);
    console.log(
      `钱包1: ${ethers.formatEther(await provider.getBalance(wallet1))} ETH`
    );
    console.log(
      `钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`
    );
    // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
      to: address1,
      value: ethers.parseEther('0.0001'),
    };
    // iii. 发送交易，获得收据
    console.log(`\nii. 等待交易在区块链确认（需要几分钟）`);
    const receipt = await wallet2.sendTransaction(tx);
    await receipt.wait(); // 等待链上确认交易
    console.log(receipt); // 打印交易详情
    // iv. 打印交易后余额
    console.log(`\niii. 发送后余额`);
    console.log(
      `钱包1: ${ethers.formatEther(await provider.getBalance(wallet1))} ETH`
    );
    console.log(
      `钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`
    );
  };

  const queryEvent = async () => {
    const ALCHEMY_GOERLI_URL =
      'https://goerli.infura.io/v3/ed5b0f1b62784c8eb4cf5e2efdb834b6';
    const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);
    const abiWETH = [
      'event Transfer(address indexed from, address indexed to, uint amount)',
    ];
    // 测试网WETH地址
    const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
    // 声明合约实例
    const contract = new ethers.Contract(addressWETH, abiWETH, provider);
    const blockNumber = await provider.getBlockNumber();
    const transferEvents = await contract.queryFilter(
      'Transfer',
      blockNumber - 10,
      blockNumber
    );
    console.log(transferEvents[0]);
  };

  const listenUSDT = async () => {
    const ALCHEMY_MAINNET_URL =
      'https://eth-mainnet.g.alchemy.com/v2/6YKKbJvfdb2ms--Jx_b8UPapEz1MR5VJ';
    const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
    const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
    const abiUSDT = [
      'event Transfer(address indexed from, address indexed to, uint amount)',
    ];
    const contractUSDT = new ethers.Contract(
      contractAddress,
      abiUSDT,
      provider
    );
    //监听一次
    contractUSDT.once('Transfer', (from, to, amount) => {
      console.log(
        `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(amount), 6)}`
      );
    });
  };

  const filterEvent = async () => {
    const ALCHEMY_MAINNET_URL =
      'https://eth-mainnet.g.alchemy.com/v2/6YKKbJvfdb2ms--Jx_b8UPapEz1MR5VJ';
    const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
    const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';
    // 交易所地址
    const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60';
    const abi = [
      'event Transfer(address indexed from, address indexed to, uint value)',
      'function balanceOf(address) public view returns(uint)',
    ];
    const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);
    const usdtbalance = await contractUSDT.balanceOf(accountBinance);
    console.log(`USDT余额: ${ethers.formatUnits(usdtbalance, 6)}\n`);
    const filterBalanceIn = contractUSDT.filters.Transfer(null, accountBinance);
    console.log('过滤器详情：');
    console.log(filterBalanceIn);
    contractUSDT.on(filterBalanceIn, (from, to, value) => {
      console.log('---------监听USDT进入交易所--------');
      console.log(`${from} -> ${to} ${ethers.formatUnits(value, 6)}`);
    });
  };

  const staticCall = async () => {};

  useEffect(() => {
    // main();
    // getBalance();
    // getBlock();
    // writeContract();
    // deployContract();
    // sendEth();
    // queryEvent();
    // listenUSDT();
    filterEvent();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>DApp</title>
        <meta content='Generated by Fast-DApp-Cli' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          Welcome to <a href=''>Fast-DApp-Cli</a>!
        </h1> */}
        {hasMounted && <ConnectWallet />}
        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p> */}

        <div className={styles.grid}>
          <a className={styles.card} href='https://rainbowkit.com'>
            <h2>Fast-Dapp-Cli Documentation &rarr;</h2>
            <p>Learn how to customize your wallet connection flow.</p>
          </a>

          <a className={styles.card} href='https://wagmi.sh'>
            <h2>wagmi Documentation &rarr;</h2>
            <p>Learn how to interact with Ethereum.</p>
          </a>

          <a className={styles.card} href='https://nextjs.org/docs'>
            <h2>Next.js Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            className={styles.card}
            href='https://github.com/vercel/next.js/tree/canary/examples'
          >
            <h2>Next.js Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a href='https://rainbow.me' rel='noopener noreferrer' target='_blank'>
          Made By Fast-DApp-cli
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
