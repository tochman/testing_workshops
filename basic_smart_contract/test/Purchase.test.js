const { expect } = require('chai')
const { waffle } = require('hardhat')
const Purchase = require('../src/artifacts/contracts/Purchase.sol/Purchase.json')


describe('Purchase', async () => {
  const [serviceProvider, buyer] = waffle.provider.getWallets()

  beforeEach(async () => {
    contract = await waffle.deployContract(serviceProvider, Purchase, [buyer.address])
  });

  it('is expected to be deployed by a signer', async () => {
    expect(contract.signer).to.equal(serviceProvider)
  });

  it('is expected to have a serviceProviderAddress', async () => {
    expect(await contract.serviceProviderAddress()).to.eql(serviceProvider.address)
  });

  it('is expected to have a buyerAddress', async () => {
    expect(await contract.buyerAddress()).to.eql(buyer.address)
  });

  describe('buyer can initiate the purchase process', () => {
    
    beforeEach(async () => {
      contract.initiate()

      // {service: 'Software Development', amount: 10, unit: 'h'}
    });

    it.only('is expected to set contract status to "initiated"', async () => {
      expect(await contract.status()).to.eql('initiated')
    });

    it('is expected to set contract requiredService to "Software Development"', () => {
      
    });

  });

});