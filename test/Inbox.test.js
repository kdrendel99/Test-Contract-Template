const assert = require('assert');
const ganache = require('ganache-cli');
//use capital Web3, because it's a constructor. Used to create instances of the web3 library 
const Web3 = require('web3');
//instantiation of web3, and passing in our provider to connect us to the network we want (ganache)
const web3 = new Web3(ganache.provider())

const { interface, bytecode } = require('../compile')

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!'


beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  //use one of those accounts to deploy the contract
  //contract is an instance here
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox Contract', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async() => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING)
  })

  it('updates message', async() => {
    await inbox.methods.setMessage('Bye there!').send({ from: accounts[0] })
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bye there!');
  })
})


