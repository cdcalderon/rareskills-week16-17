# Question 1: The OZ upgrade tool for hardhat defends against 6 kinds of mistakes. What are they and why do they matter?

The OpenZeppelin Hardhat Upgrades plugin provides a robust system to deploy and manage upgradeable contracts on Ethereum. It defends against six kinds of mistakes that can occur during the contract upgrade process:

1. **Unsafe Implementation**: The plugin validates that the contract implementation is upgrade safe. This is crucial because certain features in Solidity are not compatible with upgradeable contracts, such as the constructor function or the selfdestruct operation. The plugin checks for these features and prevents you from deploying a contract that uses them.

2. **Incompatible Upgrades**: When upgrading a contract, the plugin checks that the new implementation is not only upgrade safe, but also compatible with the previous implementation. This is important because changing the order or type of state variables in a contract can corrupt the storage when upgrading.

3. **Missing Proxy Admin**: The plugin automatically deploys a proxy admin for your project if needed. The proxy admin is the account that has the rights to upgrade the proxy. If it's missing, you won't be able to upgrade your contracts.

4. **Redundant Deployments**: The plugin checks if there is an implementation contract deployed with the same bytecode, and deploys one if not. This prevents unnecessary deployments and helps to keep your project organized.

5. **Untracked Deployments**: The plugin keeps track of all the implementation contracts you have deployed in an `.openzeppelin` folder in the project root, as well as the proxy admin. This is important for managing your project and knowing which contracts have been deployed and where.

6. **Incorrect Proxy Usage**: The plugin provides functions to manage proxy admin rights and to interact with your contracts correctly. For example, it provides a function to change the admin of a proxy. This is important because the admin of a proxy can only upgrade it, but not interact with the implementation contract.

These safeguards are important because mistakes in the upgrade process can lead to loss of funds, corrupted contract storage, or contracts becoming stuck in an irrecoverable state. By using the OpenZeppelin Hardhat Upgrades plugin, you can avoid these pitfalls and ensure that your upgrade process is safe and reliable.

Resources:

- [OpenZeppelin Hardhat Upgrades API documentation](https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades)
- [OpenZeppelin Upgrades Plugins documentation](https://docs.openzeppelin.com/upgrades-plugins/1.x/)
- [OpenZeppelin Upgrades Plugins: How the plugins work](https://docs.openzeppelin.com/upgrades-plugins/1.x/#how-the-plugins-work)
