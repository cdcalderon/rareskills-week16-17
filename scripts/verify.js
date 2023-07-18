const { run } = require("hardhat");

const verify = async () => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: 0x47dba63546b21bc93778349002c7429488b0375b,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};

module.exports = {
  verify,
};

// scripts/verify.js

// const { run } = require("hardhat");

// async function main() {
//   // Replace with your Bag and BagV2 contract addresses
//   const BAG_ADDRESS = "0xYourBagContractAddress";
//   const BAG_V2_ADDRESS = "0xYourBagV2ContractAddress";

//   console.log("Verifying Bag...");
//   await run("verify:verify", {
//     address: BAG_ADDRESS,
//     constructorArguments: [], // If your constructor has arguments, you need to provide them here
//   });

//   console.log("Verifying BagV2...");
//   await run("verify:verify", {
//     address: BAG_V2_ADDRESS,
//     constructorArguments: [], // If your constructor has arguments, you need to provide them here
//   });

//   console.log("Verification done!");
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
