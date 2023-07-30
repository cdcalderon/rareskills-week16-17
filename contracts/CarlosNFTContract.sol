// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract CarlosNFTContract is Initializable, ERC721Upgradeable {
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
}
