import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Purchase from "./artifacts/contracts/Purchase.sol/Purchase.json";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

const App = () => {
  const [status, setStatus ] = useState()

  const requestAccount = async () => {
    await window.ethereum.request({method: "eth_requestAccount"})
  }

  async function fetchStatus() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, Purchase.abi, provider)
      try {
        const data = await contract.requiredService()
        console.log('data: ', data)
        setStatus(data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  useEffect(() => {
    fetchStatus()
  }, [])
  return (
    <>
      <h1>Purchase Contract</h1>
      <p>{status}</p>
    </>
  )
}

export default App
