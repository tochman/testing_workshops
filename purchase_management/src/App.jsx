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
      !provider.isConnected() && await window.ethereum.enable()
      // console.log(provider.getNetwork().name)
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log(await web3Provider.getNetwork())
      debugger
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
      <h1>Purchase Contract</h1>
      <p>Your address is: {address}</p>
      <DeployConstract provider={w3provider} />
  
    </>
  )
}

export default App
