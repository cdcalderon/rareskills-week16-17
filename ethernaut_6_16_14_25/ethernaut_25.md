# Ethernaut 25 Motorbike Challenge

## Challenge

The challenge involves a smart contract system that uses a proxy pattern called UUPS (Universal Upgradeable Proxy Standard). The system consists of a Motorbike contract (the proxy) and an Engine contract (the implementation). The goal is to call `selfdestruct()` on the Engine contract, rendering the Motorbike contract unusable.

## Vulnerability

The vulnerability lies in the `initialize()` function of the Engine contract. This function, which is supposed to be called by the Motorbike contract, sets the `upgrader` to the `msg.sender`. However, if the `initialize()` function is called directly on the Engine contract, the caller becomes the `upgrader`. This allows an attacker to upgrade the Engine contract to a malicious contract.

## Exploit

The exploit involves creating a malicious contract with a `selfdestruct()` function. The attacker first calls the `initialize()` function on the Engine contract to become the `upgrader`. Then, the attacker calls the `upgradeToAndCall()` function on the Engine contract, passing in the address of the malicious contract and the data to call the `selfdestruct()` function. This destroys the Engine contract and renders the Motorbike contract unusable.

## Takeaway

This challenge highlights the importance of understanding the context in which functions are called in smart contracts, especially when using delegate calls. It also emphasizes the need for proper access control on critical functions like contract upgrades. Even a small oversight can lead to severe consequences, such as the destruction of the entire contract system.
