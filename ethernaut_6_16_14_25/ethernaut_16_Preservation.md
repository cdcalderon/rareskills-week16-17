# Ethernaut Level 16: Preservation Challenge Explained

## The Challenge

The Preservation contract has two library contracts and an owner. The library contracts have a `setTime` function that modifies the state at slot 0. The Preservation contract can invoke this function through a delegatecall in its `setFirstTime` function. Your task is to exploit this setup to change the owner of the Preservation contract.

## How to solve the challenge?

The solution involves three parts:

### Create a malicious contract

This contract should have the same storage layout as the Preservation contract. It should have a `setTime` function that updates the owner slot with your wallet address.

```solidity
contract BadLibraryContract {
    address public timeZone1Library; // SLOT 0
    address public timeZone2Library; // SLOT 1
    address public owner; // SLOT 2
    uint storedTime; // SLOT 3

    function setTime(uint _time) public {
        owner = msg.sender;
    }
}
```

## Update timeZone1Library to the malicious contract

Deploy the malicious contract and get its address. Convert this address to a uint and pass it to the `setFirstTime` function of the Preservation contract. This will change the timeZone1Library to your malicious contract.

## Gain Ownership

Invoke `setFirstTime` again with an arbitrary uint variable. This time, it will invoke the `setTime` function in your malicious contract, changing the owner of the Preservation contract to your wallet address.

## Key Takeaways

This challenge highlights the potential security risks of delegatecalls, especially when the called contract can modify important state variables. It's crucial to ensure that only trusted contracts can be called and that function names in different contracts do not clash.

This challenge is a great way to understand how a malicious contract can be injected using delegatecalls, a technique often used in Ethereum hacks.
