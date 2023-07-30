// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   console.log("1. Deploying contracts with the account:", deployer.address);
//   console.log("2. Account balance:", (await deployer.getBalance()).toString());

//   const CarlosERC20Contract = await ethers.getContractFactory(
//     "CarlosERC20Contract"
//   );
//   const carlosERC20Contract = await upgrades.deployProxy(
//     CarlosERC20Contract,
//     [99],
//     {
//       initializer: "initialize",
//       kind: "transparent",
//     }
//   );

//   await carlosERC20Contract.deployed();

//   console.log(
//     `CarlosERC20Contract Proxy Address: ${carlosERC20Contract.address}`
//   );
//   console.log(
//     `CarlosERC20Contract Implementation Address: ${await upgrades.getImplementationAddress(
//       carlosERC20Contract.address
//     )}`
//   );
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// // npx hardhat run --network goerli scripts/deployERC20.js

// // 1. Deploying contracts with the account: 0xd08E1E3F6932675E931A20f1AD0B0547d6253d3f
// // 2. Account balance: 1077140438178294278
// // CarlosERC20Contract Proxy Address: 0xD4d28dA230537980C6b5487c1455281e3D57b4aF

const { ethers, upgrades } = require("hardhat");

async function getImplementationAddress(provider, proxyAddress) {
  const slot =
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
  const storage = await provider.getStorageAt(proxyAddress, slot);
  return ethers.utils.getAddress("0x" + storage.slice(26));
}

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("1. Deploying contracts with the account:", deployer.address);
  console.log("2. Account balance:", (await deployer.getBalance()).toString());

  const CarlosERC20Contract = await ethers.getContractFactory(
    "CarlosERC20Contract"
  );
  const carlosERC20Contract = await upgrades.deployProxy(
    CarlosERC20Contract,
    [99],
    {
      initializer: "initialize",
      kind: "transparent",
    }
  );

  await carlosERC20Contract.deployed();

  console.log(
    `CarlosERC20Contract Proxy Address: ${carlosERC20Contract.address}`
  );
  const implementationAddress = await getImplementationAddress(
    deployer.provider,
    carlosERC20Contract.address
  );
  console.log(
    `CarlosERC20Contract Implementation Address: ${implementationAddress}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run --network goerli scripts/deployERC20.js
// Compiled 1 Solidity file successfully
// 1. Deploying contracts with the account: 0xd08E1E3F6932675E931A20f1AD0B0547d6253d3f
// 2. Account balance: 1021486094480765060
// CarlosERC20Contract Proxy Address: 0x6Cd6013a8B6417D455fc524EE033f4B9b6fA43C0
// CarlosERC20Contract Implementation Address: 0x03E6B5740Ebfae3cC6e6DC5092a123b6A6aEB1AE
