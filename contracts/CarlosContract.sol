// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract CarlosContract is Initializable {
    uint256 public value;

    function initialize(uint256 _value) public initializer {
        value = _value;
    }

    function setMyValue(uint256 _value) external {
        value = _value;
    }
}
