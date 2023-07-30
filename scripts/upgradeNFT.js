const { ethers, upgrades } = require("hardhat");

async function main() {
  const CarlosNFTContractV2 = await ethers.getContractFactory(
    "CarlosNFTContractV2"
  );

  console.log("Upgrading CarlosNFTContract!!!");

  await upgrades.upgradeProxy(
    "0xB7a00899baa9f8f6E35b97Ead670Df4c88eb7f00", // deployed proxy address (e.g.: V1)
    CarlosNFTContractV2
  );

  console.log("CarlosNFTContractV2 upgraded Successfully");
}

main();
