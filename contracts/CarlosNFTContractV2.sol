// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract CarlosNFTContractV2 is Initializable, ERC721Upgradeable {
    uint256 public value;

    // To prevent the implementation contract from being used, you should invoke the
    // _disableInitializers function in the constructor to automatically lock it when it is deployed
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(uint256 _value) external initializer {
        __ERC721_init("UpgradeableToken", "UGT");
        value = _value;
    }

    function getMyValue() external view returns (uint256) {
        return value;
    }

    function setMyValue(uint256 _newValue) external {
        value = _newValue;
    }
}

// npx hardhat run --network goerli scripts/deployNFT.js
// CarlosNFTContract Proxy Address: 0xB7a00899baa9f8f6E35b97Ead670Df4c88eb7f00
// CarlosNFTContract Implementation Address: 0xB14A7b6138A15e1c3397f8838C59f9b49D7a6E06
