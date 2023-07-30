// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract CarlosERC20ContractV2 is Initializable, ERC20Upgradeable {
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

    function setMyValue(uint256 _newValue) external {
        value = _newValue;
    }

    // For v2
    function mint(uint256 _initialSupply) external {
        _mint(msg.sender, _initialSupply);
    }
}

// Upgrading CarlosERC20 V2 Contract!!!
// CarlosERC20ContractV2 upgraded Successfully
// CarlosERC20ContractV2 Proxy Address: 0x6Cd6013a8B6417D455fc524EE033f4B9b6fA43C0
