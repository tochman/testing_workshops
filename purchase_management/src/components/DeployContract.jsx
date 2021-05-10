import React, { useState } from 'react'
import { ContractFactory } from "ethers"
import Purchase from '../artifacts/contracts/Purchase.sol/Purchase.json'

const DeployContract = ({ provider }) => {
  const [buyerAddress, setBuyerAddress] = useState('')
  
  const deployContract = async () => {
    const signer = provider.getSigner(window.ethereum.selectedAddress)
    const contractFactory = ContractFactory.fromSolidity(Purchase, signer)
    const contract = await contractFactory.deploy(buyerAddress)
    await contract.deployed()
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
