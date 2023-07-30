const { ethers, upgrades } = require("hardhat");

async function main() {
  const CarlosERC20ContractV2 = await ethers.getContractFactory(
    "CarlosERC20ContractV2"
  );

  console.log("Upgrading CarlosERC20 V2 Contract!!!");

  const upgradedContract = await upgrades.upgradeProxy(
    "0x6Cd6013a8B6417D455fc524EE033f4B9b6fA43C0",
    CarlosERC20ContractV2
  );

  console.log("CarlosERC20ContractV2 upgraded Successfully");
  console.log(
    `CarlosERC20ContractV2 Proxy Address: ${upgradedContract.address}`
  );
}

main();
