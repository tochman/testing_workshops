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

    function initiate(
        string memory service,
        uint256 amount,
        string memory unit
    ) external {
        require(msg.sender == buyerAddress, "You can't perform this operation");
        status = "initiated";
        requiredService = RequiredService(service, amount, unit);
    }
}
