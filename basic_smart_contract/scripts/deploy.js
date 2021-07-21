const hardhat = require('hardhat')

async function main() {
  const Purchase = await hardhat.ethers.getContractFactory('Purchase')
  const purchaseOrder = await Purchase.deploy()

  await purchaseOrder.deployed()

  console.log(`Purchase order was deployed to ${purchaseOrder.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })