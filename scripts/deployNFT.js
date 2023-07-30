const { ethers, upgrades } = require("hardhat");

async function getImplementationAddress(provider, proxyAddress) {
  const slot =
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
  const storage = await provider.getStorageAt(proxyAddress, slot);
  return ethers.utils.getAddress("0x" + storage.slice(26));
}

async function main() {
  const CarlosNFTContract = await ethers.getContractFactory(
    "CarlosNFTContract"
  );
  const contract = await upgrades.deployProxy(CarlosNFTContract, [99], {
    initializer: "initialize",
    kind: "transparent",
  });

  await contract.deployed();

  console.log(`CarlosNFTContract Proxy Address: ${contract.address}`);
  const implementationAddress = await getImplementationAddress(
    ethers.provider,
    contract.address
  );
  console.log(
    `CarlosNFTContract Implementation Address: ${implementationAddress}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run --network goerli scripts/deployNFT.js
// CarlosNFTContract Proxy Address: 0xB7a00899baa9f8f6E35b97Ead670Df4c88eb7f00
// CarlosNFTContract Implementation Address: 0xB14A7b6138A15e1c3397f8838C59f9b49D7a6E06
