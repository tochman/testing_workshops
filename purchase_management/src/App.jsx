import React, { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

// import { ethers } from 'ethers'

// 1. Make sure that the app knows who I am
// 2. Build an interface to input the Buyers address and get the info needed to deploy the contract
// 3. Deploy the Purchase contract

const App = () => {
  const [address, setAddress ] = useState("Loading...")

  const requestAccount = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      return provider.selectedAddress
    } else {
      return "No address can be foiund, please install MetaMask"
    }
  }

  useEffect(() => {
    requestAccount().then(address => setAddress(address))
  }, [])
  return (
    <>
      <h1>Purchase Contract</h1>
      <p>{address}</p>
    </>
  )
}

export default App
