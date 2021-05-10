// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Purchase {
    address public buyerAddress;
    address public serviceProviderAddress;
    struct RequiredService {
        string service;
        uint32 amount;
        string unit;
    }

    enum ProcessStatus {
        Deployed,
        Initiated,
        InProgress,
        Delivered,
        Accepted,
        Finalized
    }

    event InitialDeploy(
        address indexed from,
        address indexed to,
        string message
    );

    event Initialize(
        address indexed from,
        address indexed to,
        string service,
        uint32 amount,
        string unit
    );

    RequiredService public requiredService;
    ProcessStatus public status = ProcessStatus.Delivered;

    constructor(address _buyerAddress) {
        buyerAddress = _buyerAddress;
        serviceProviderAddress = msg.sender;
        emit InitialDeploy(msg.sender, buyerAddress, 'An invite to purchase services has been created');
    }

    function initiate(
        string memory service,
        uint32 amount,
        string memory unit
    ) external {
        require(
            msg.sender == buyerAddress,
            msg.sender != serviceProviderAddress
                ? "You can't perform this operation"
                : "It does not make sense to perform that operation!"
        );
        status = ProcessStatus.Initiated;
        requiredService = RequiredService(service, amount, unit);
        emit Initialize(msg.sender, serviceProviderAddress, service, amount, unit);
    }
}
