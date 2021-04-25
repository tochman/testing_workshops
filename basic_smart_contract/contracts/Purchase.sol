// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import 'hardhat/console.sol';

contract Purchase {
  address public buyerAddress;
  address public serviceProviderAddress;
  string public status;

  constructor(address _buyerAddress) {
    buyerAddress = _buyerAddress;
    serviceProviderAddress = msg.sender;
  }

  function initiate() public returns (string memory){
    status = 'initiated';
    return status; 
  }

}

