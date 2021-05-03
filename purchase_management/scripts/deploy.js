const hardhat = require('hardhat')

async function main() {
  const Purchase = await hardhat.ethers.getContractFactory('Purchase')
  const purchaseOrder = await Purchase.deploy('0x70997970c51812dc3a010c7d01b50e0d17dc79c8')

  await purchaseOrder.deployed()

  console.log(`Purchase order was deployed to ${purchaseOrder.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })