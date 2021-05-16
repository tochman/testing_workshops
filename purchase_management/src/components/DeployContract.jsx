import React, { useState } from 'react'
import { MDBBtn } from "mdbreact";

import { ContractFactory } from "ethers"
import Purchase from '../artifacts/contracts/Purchase.sol/Purchase.json'

const DeployContract = ({ provider }) => {
  const [buyerAddress, setBuyerAddress] = useState('')
  const [contract, setContract] = useState()

  const deployContract = async () => {
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
          <h4>You contract was deployed. <span data-cy="contract-address">{contract.address}</span></h4>
        </div>
        :
        <>
          <label 
          htmlFor="buyer-address"
          className="grey-text">ADDRESS</label>
          <input
            type="text"
            id="buyer-address"
            data-cy="buyer-address"
            className="form-control"
            onChange={e => setBuyerAddress(e.target.value)}
          />
          <MDBBtn color="indigo"
            data-cy="deploy-contract"
            onClick={() => deployContract()}
          >DEPLOY</MDBBtn>
        </>
      }
    </>
  )
}

export default DeployContract
