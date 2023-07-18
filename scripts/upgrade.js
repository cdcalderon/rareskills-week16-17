const { ethers, upgrades } = require("hardhat");

const proxyAddress = "0x47Dba63546b21bc93778349002C7429488b0375b";

async function main() {
  const CarlosContractV2 = await ethers.getContractFactory("CarlosContractV2");
  const carlosContractV2 = await upgrades.upgradeProxy(
    proxyAddress,
    CarlosContractV2
  );

  // Get and log the implementation address after the upgrade
  const implementationAddress = await upgrades.getImplementationAddress(
    ethers.provider,
    proxyAddress
  );
  console.log("New implementation address is:", implementationAddress);

  console.log(
    "carlosContractV2 upgraded to version 2 at:",
    carlosContractV2.address
  );
}

main();
