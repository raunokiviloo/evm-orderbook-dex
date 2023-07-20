const { ethers } = require("hardhat");

async function main() {
    // Fetch dontract to deploy
    const Token = await ethers.getContractFactory("Token") //Gets bytecode and contract ABI. 

    //Deploy contract
    const token = await Token.deploy()
    await token.deployed()
    console.log(`Token Deployed to: ${token.address}`) // We use `${}` for string value interpolation.
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });