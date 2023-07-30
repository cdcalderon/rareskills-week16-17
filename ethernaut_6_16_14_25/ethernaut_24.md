## Ethernaut Challenge 24: Summary, Vulnerability, Exploit, and Takeaways

# Challenge Description:

Ethernaut Challenge 24 is a complex puzzle that revolves around exploiting a smart contract to gain control over it. The challenge presents a target wallet contract with various functions, including `proposeNewAdmin`, `addToWhitelist`, `deposit`, `multicall`, `execute`, and `setMaxBalance`. The objective is to manipulate these functions to gain control over the contract.

# Vulnerability

The vulnerability lies in the `setMaxBalance` function and the storage layout of the contract. The `setMaxBalance` function, which is intended to set the maximum balance of the wallet, can be exploited to overwrite the `admin` state variable due to the way Solidity stores state variables. This is because the `admin` state variable is stored in the storage slot next to the `maxBalance` state variable.

```solidity
contract PuzzleProxy is UpgradeableProxy {
    address public pendingAdmin;
    address public admin;

contract PuzzleWallet {
    address public owner;
    uint256 public maxBalance;

```

Another vulnerability is in the `multicall` function, which does not guard itself from calling itself multiple times. This allows for multiple calls to the `deposit` function, leading to an unexpected increase in the contract's balance.

# Exploit

The exploit involves a series of steps:

Proposing the attacking contract as the new admin of the target wallet contract.
Adding the attacking contract to the whitelist of the target wallet contract.
Using the `multicall` function to deposit ether into the target wallet contract twice, effectively doubling the balance.
Executing a transaction to send a portion of the ether back to the sender of the attacking contract.
Using the setMaxBalance function to set the maximum balance of the wallet to the address of the sender, effectively gaining control over the wallet's balance and overwriting the admin state variable.
Finally, self-destructing the attacking contract, sending any remaining ether to the sender, and completing the exploit.
