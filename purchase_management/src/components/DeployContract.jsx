import React, { useState } from 'react'
import { ContractFactory } from "ethers"
import Purchase from '../artifacts/contracts/Purchase.sol/Purchase.json'

const DeployContract = ({ provider }) => {
  const [buyerAddress, setBuyerAddress] = useState('')
  const deployContract = async () => {
    const signer = provider.getSigner()
    const contractFactory = ContractFactory.fromSolidity(Purchase, signer)
    contractFactory.attach(window.ethereum.selectedAddress)
    const contract = await contractFactory.deploy(buyerAddress)
    debugger
  }
  return (
    <>
      <label htmlFor="buyer-address">ADDRESS</label>
      <input
        type="text"
        id="buyer-address"
        onChange={e => setBuyerAddress(e.target.value)}
      />
      <button
        onClick={() => deployContract()}
      >DEPLOY</button>
    </>
  )
}

export default DeployContract
