const assert = require('assert');
const ganache = require('ganache-cli');
//use capital Web3, because it's a constructor. Used to create instances of the web3 library 
const Web3 = require('web3');
//instantiation of web3, and passing in our provider to connect us to the network we want (ganache)
const web3 = new Web3(ganache.provider())


console.log('example ran.')

class Car {
  park() {
    return 'stopped'
  }

  drive(){
    return 'vroom'
  }
}

//assigned value for each test. This is here b/c of scope for the tests
let car; 

//before each 'it' test
beforeEach(() => {
  car = new Car()
})

describe('Car tests', () => {
  it('park should return "stopped"', () => {
    assert.equal(car.park(), 'stopped');
  })

  it('drive should return vroom', () => {
    assert.equal(car.drive(), 'vroom');
  })
});