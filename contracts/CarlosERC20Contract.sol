// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract CarlosERC20Contract is Initializable, ERC20Upgradeable {
    uint256 public value;

    // To prevent the implementation contract from being used, you should invoke the
    // _disableInitializers function in the constructor to automatically lock it when it is deployed
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(uint256 _value) external initializer {
        __ERC20_init("UpgradeableToken", "UGT");
        value = _value;
    }

    function getMyValue() external view returns (uint256) {
        return value;
    }
}

// 1. Deploying contracts with the account: 0xd08E1E3F6932675E931A20f1AD0B0547d6253d3f
// 2. Account balance: 1021486094480765060
// CarlosERC20Contract Proxy Address: 0x6Cd6013a8B6417D455fc524EE033f4B9b6fA43C0
// CarlosERC20Contract Implementation Address: 0x03E6B5740Ebfae3cC6e6DC5092a123b6A6aEB1AE
