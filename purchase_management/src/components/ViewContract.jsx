import React, { useState } from 'react'
import Purchase from '../artifacts/contracts/Purchase.sol/Purchase.json'
import { ethers } from 'ethers'
const ViewContract = ({ provider }) => {
  const [contractAddress, setContractAddress] = useState('')
  const [contract, setContract] = useState()
  const [status, setStatus] = useState()

  const fetchContract = async () => {
    const address = contractAddress
    const contractFactory = new ethers.Contract(address, Purchase.abi, provider)
    let deployedContract = contractFactory.attach(address)
    setContract(deployedContract)
    setStatus(await deployedContract.status())
  }


  // contract && (async () => {console.log(await contract.serviceProviderAddress())} )()

  return (
    <>
      <label htmlFor="contract-address">Contract Adress</label>
      <input
        type="text"
        onBlur={(event) => setContractAddress(event.target.value)}
        id="contract-address" />
      <button
        onClick={() => fetchContract()}
      >FETCH
        </button>

      {contract &&
        <>
          <h1>We have a contract</h1>
          {contract.address}
          {`Status ${status}`}
        </>
      }
    </>
  )
}

export default ViewContract
