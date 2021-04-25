// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Purchase {
    address public buyerAddress;
    address public serviceProviderAddress;
    string public status;
    struct RequiredService {
        string service;
        uint256 amount;
        string unit;
    }

    RequiredService public requiredService;

    constructor(address _buyerAddress) {
        buyerAddress = _buyerAddress;
        serviceProviderAddress = msg.sender;
        status = "deployed";
    }

    function initiate( string memory service, uint256 amount, string memory unit) external {
      // 1. check if the signer is the buyer
      if (msg.sender == buyerAddress) {
      // 3. if YES: Then move on and set the req Service
        // console.log(msg.sender);
        status = "initiated";
        requiredService = RequiredService(service, amount, unit);

      } else {
      // 2. if NOT: Get the hell out of here

      }
    }
}
