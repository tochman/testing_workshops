import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";

import detectEthereumProvider from '@metamask/detect-provider'
import DeployContract from "./components/DeployContract";
import ViewContract from "./components/ViewContract";

// 1. Make sure that the app knows who I am
// 2. Build an interface to input the Buyers address and get the info needed to deploy the contract
// 3. Deploy the Purchase contract (validate the address beforehand?)

const App = () => {
  const [address, setAddress] = useState("Loading...")
  const [w3provider, setW3Provider] = useState({})
  const requestAccount = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      !provider.isConnected() && await window.ethereum.enable()
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      return web3Provider
    } else {
      return "No address can be found, please install MetaMask"
    }
  }
  
  useEffect(() => {
    requestAccount().then(provider => {
      setAddress(window.ethereum.selectedAddress)
      setW3Provider(provider)
    })
  }, [])
  return (
    <>
      <h1 data-cy="title">Purchase Contract</h1>
      <p data-cy="address">Your address is: {address}</p>
      <DeployContract provider={w3provider} />
      <ViewContract provider={w3provider} />
    </>
  )
}

export default App
