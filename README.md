This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Ethers

### provider

Provider类是对以太坊网络连接的抽象,提供连接接口，接触用户私钥，只能读取链上信息，不能写入，这一点比web3.js要安全。

一些方法：

- getBalance() 获取余额
- getNetwork() 查询连接到了哪条链
- getTransactionCount() 交易数量
- getBlockNumber() 区块高度
- 

### Infrua

在以太坊上开发的Dapp应用（链下）需要与区块链（链上）交互。早期，以太坊上的基础设施很少，开发者需要在本地部署以太坊节点来完成链下和链上的交互，非常麻烦，且耗时数日。

Infura在链下、链上之间搭了一座桥，让两者的交互变的简单。它为用户提供对以太坊和IPFS网络的即时、可扩展的API访问。开发者在Infura官网注册后，就可以免费申请的以太坊API KEY，就可以利用Infura的节点与区块链交互。另外，小狐狸metamask钱包内置了Infura服务，方便用户访问以太坊网络。


### Contract类

Contract 类是部署在以太坊网络上的合约的抽象 通过它，开发者可以非常容易的对合约进行读取call和交易transaction，并可以获得交易的结果和事件。


只读Contract: 

`const contract = new ethers.Contract(`address`, `abi`, `provider`);`

可读写Contract:

`const contract = new ethers.Contract(`address`, `abi`, `signer`);`

ABI (Application Binary Interface) 是与以太坊智能合约交互的标准，

有两种方法创建ABI 直接输入合约abi。从remix的编译页面中复制，或者用Human-Readable Abi。

```ts
// 第2种输入abi的方式：输入程序需要用到的函数，逗号分隔，ethers会自动帮你转换成相应的abi
// 人类可读abi，以ERC20合约为例
const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider)

```

### Signer 类

Singer签名管理密钥，是以太坊的抽象，可用于对消息和交易进行签名，并将签名的交易发送到以太坊网络，并更改区块链状态。Signer类是抽象类，不能直接实例化，需要使用它的子类：Wallet钱包类。

### wallet

Wallet类继承了Signer类，并且开发者可以像包含私钥的外部拥有帐户（EOA）一样，用它对交易和消息进行签名。

我们可以利用ethers.Wallet.createRandom()函数创建带有随机私钥的Wallet对象。该私钥由加密安全的熵源生成，如果当前环境没有安全的熵源，则会引发错误（没法在在线平台playcode使用此方法）。

```ts
const wallet = ethers.Wallet.createRandom()
```

用私钥创建wallet对象

```ts
const wallet2 = new ethers.Wallet(privateKey, provider)

```

通过助记词创建

```ts
ethers.Wallet.fromMnemonic()
```

发送eth

```ts

    // 创建交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
        to: address1,
        value: ethers.parseEther("0.001")
    }
      const receipt = await wallet2.sendTransaction(tx)
    await receipt.wait() // 等待链上确认交易
    console.log(receipt) // 打印交易详情

```

### 事件过滤

solidity事件可以有四条数据作为索引，索引数据经过哈希处理并包含在布隆过滤器中，这是一种允许有效过滤的数据结构。因此，一个事件过滤器最多包含4个主题集，每个主题集是个条件，用于筛选目标事件。

布隆过滤器规则：
- 如果主题集是null，该位置不会被过滤
- 如果该位置是一个单个值，则该位置必须与该值匹配
- 如果主题集是数组，则该位置的日志主题至少与数组其中一个匹配


``` 
构建过滤器：

过滤来自myAddress地址的Transfer事件
contract.filters.Transfer(myAddress)

过滤所有发给 myAddress地址的Transfer事件
contract.filters.Transfer(null, myAddress)

过滤所有从 myAddress发给otherAddress的Transfer事件
contract.filters.Transfer(myAddress, otherAddress)

过滤所有发给myAddress或otherAddress的Transfer事件
contract.filters.Transfer(null, [ myAddress, otherAddress ])

```