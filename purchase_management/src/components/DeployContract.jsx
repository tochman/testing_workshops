import React, { useState } from 'react'
import { ContractFactory } from "ethers"
import Purchase from '../artifacts/contracts/Purchase.sol/Purchase.json'

const DeployContract = ({ provider }) => {
  const [buyerAddress, setBuyerAddress] = useState('')
  const [contract, setContract] = useState()

  const deployContract = async () => {
    debugger
    const signer = provider.getSigner(window.ethereum.selectedAddress)
    const contractFactory = ContractFactory.fromSolidity(Purchase, signer)
    const contract = await contractFactory.deploy(buyerAddress)
    await contract.deployed()
    setContract(contract)
  }
  return (
    <>
      { contract ?
        <div data-cy="status-message">
          <h2>You contract was deployed. {contract.address}</h2>
        </div>
        :
        <>
          <label htmlFor="buyer-address">ADDRESS</label>
          <input
            type="text"
            id="buyer-address"
            data-cy="buyer-address"
            onChange={e => setBuyerAddress(e.target.value)}
          />
          <button
            data-cy="deploy-contract"
            onClick={() => deployContract()}
          >DEPLOY</button>
        </>
      }
    </>
  )
}

export default DeployContract
