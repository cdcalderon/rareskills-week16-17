// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.utils.parseEther("0.001");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with ${ethers.utils.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const CarlosContract = await ethers.getContractFactory("CarlosContract");
//   const carlosContract = await upgrades.deployProxy(CarlosContract, [35], {
//     initializer: "initialize",
//   });
//   console.log("CarlosContract deployed to:", carlosContract.address);
//   //CarlosContract deployed to: 0x47Dba63546b21bc93778349002C7429488b0375b
// }

// main();

const { ethers, upgrades } = require("hardhat");

async function main() {
  const CarlosContract = await ethers.getContractFactory("CarlosContract");
  const carlosContract = await upgrades.deployProxy(CarlosContract, [35], {
    initializer: "initialize",
  });

  // Get the deployed proxy address
  const proxyAddress = carlosContract.address;

  // Get and log the implementation address
  const implementationAddress = await upgrades.getImplementationAddress(
    ethers.provider,
    proxyAddress
  );
  console.log("Implementation address is:", implementationAddress);

  console.log("CarlosContract deployed to:", carlosContract.address);
}

main();
