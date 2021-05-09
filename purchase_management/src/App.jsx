import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";

import detectEthereumProvider from '@metamask/detect-provider'
import DeployConstract from "./components/DeployContract";

// 1. Make sure that the app knows who I am
// 2. Build an interface to input the Buyers address and get the info needed to deploy the contract
// 3. Deploy the Purchase contract (validate the address beforehand?)

const App = () => {
  const [address, setAddress] = useState("Loading...")
  const [w3provider, setW3Provider] = useState({})

  const requestAccount = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what Metamask injects as window.ethereum into each page
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    
      return web3Provider
    } else {
      return "No address can be foiund, please install MetaMask"
    }
  }

  useEffect(() => {
    requestAccount().then(provider => {
      setW3Provider(provider)
    })
  }, [])
  return (
    <>
      <h1>Purchase Contract</h1>
      <DeployConstract provider={w3provider} />
    </>
  )
}

export default App
