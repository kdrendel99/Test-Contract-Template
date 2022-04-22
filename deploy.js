const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'mountain oyster future leader track achieve dutch wash human plug clean strategy',
  'https://rinkeby.infura.io/v3/5823a12e434c431c9bbc9efec5856b18'
);

const web3 = new Web3(provider);

const deploy = async () => {
  //a helper function so we can use async await instead of promises
  const accounts = await web3.eth.getAccounts();

  console.log('attempting to deploy from account ', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!' ]})
    .send({ gas: '1000000', from: accounts[0] });

    //an instance of our contract
  console.log('Contract deployed to ', result.options.address);
};

deploy()