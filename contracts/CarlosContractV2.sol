// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

//carlosContractV2 upgraded to version 2 at: 0x47Dba63546b21bc93778349002C7429488b0375b

contract CarlosContractV2 is Initializable {
    uint256 public value;

    // function initialize(uint256 _value) public initializer {
    //     value = _value;
    // }

    function incrementValue() external {
        value++;
    }
}
