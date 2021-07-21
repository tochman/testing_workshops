import React, { useState } from 'react'
import Purchase from '../artifacts/contracts/Purchase.sol/Purchase.json'
import Contract from '../modules/contract_properties'
import { MDBListGroup, MDBListGroupItem, MDBBtn } from "mdbreact";
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
    setStatus(Contract.status(await deployedContract.status()))
  }

  return (
    <>
      {contract ?
        <MDBListGroup style={{ width: "90vw" }}>
          <MDBListGroupItem>We have a contract</MDBListGroupItem>
          <MDBListGroupItem data-cy="fetched-contract-address">{`Address: ${contract.address}`}</MDBListGroupItem>
          <MDBListGroupItem data-cy="fetched-contract-status">{`Status: ${status}`}</MDBListGroupItem>
        </MDBListGroup> :
        <>
          <label
            className="grey-text"
            htmlFor="fetch-contract-addres">Contract Adress</label>
          <input
            type="text"
            onBlur={(event) => setContractAddress(event.target.value)}
            data-cy="fetch-contract-address"
            id="fetch-contract-addres"
            className="form-control" />
          <MDBBtn color="indigo"
            data-cy="fetch-contract"
            onClick={() => fetchContract()}
          >FETCH</MDBBtn>
        </>
      }
    </>
  )
}

export default ViewContract
