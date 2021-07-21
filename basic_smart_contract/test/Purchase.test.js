const { expect } = require('chai')
const { waffle } = require('hardhat')
const Purchase = require('../src/artifacts/contracts/Purchase.sol/Purchase.json')

let contract
describe('Purchase', async () => {
  const [serviceProvider, buyer, randomWallet] = waffle.provider.getWallets()

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

  describe('Buyer can initiate the purchase process', () => {

    describe('and pass in reqested service', () => {

      beforeEach(async () => {
        await contract.connect(buyer).initiate('Software Development', 10, 'h')
        requiredService = await contract.requiredService()
        expectedrequiredService = { service: 'Software Development', amount: 10, unit: 'h' }
      });

      it('is expected to set contract status to "initiated"', async () => {
        expect(await contract.status()).to.eql(1)
      });

      it('is expected to set contract requiredService service to "Software Development"', async () => {
        expect(requiredService[0]).to.eql(expectedrequiredService.service)
      });

      it('is expected to set contract requiredService amount to 10', async () => {
        expect(parseInt(requiredService[1])).to.eql(expectedrequiredService.amount)
      });

      it('is expected to set contract requiredService unit to "h"', async () => {
        expect(requiredService[2]).to.eql(expectedrequiredService.unit)
      });
    });

    it('is expected to emit "Initialize" event', async () => {
      await expect(contract.connect(buyer).initiate('Software Development', 10, 'h'))
      .to.emit(contract, 'Initialize')
      .withArgs(buyer.address, 'Software Development', 10, 'h');
    });

  });

  describe.only('Sad path cases', () => {
    describe('Random Wallet can NOT initiate the purchase process as Buyes', async () => {
      it('is expected to be reverted with message', async () => {
        await expect(
          contract.connect(randomWallet).initiate('Software Development', 10, 'h')
        )
          .to.be.revertedWith("You can't perform this operation")
      });
    });

    describe('Service Provider can NOT initiate the purchase process as Buyes', async () => {
      it('is expected to be reverted with message', async () => {
        await expect(
          contract.connect(serviceProvider).initiate('Software Development', 10, 'h')
        )
          .to.be.revertedWith("It does not make sense to perform that operation!")
      });
    });
  });

});