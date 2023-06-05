const hre = require("hardhat");

async function main() {
const Verifier = await hre.ethers.getContractFactory("SpendVerifier");
	const verifier = await Verifier.deploy();
	await verifier.deployed();
	const Exchange = await hre.ethers.getContractFactory("TokenExchange");
	const exchange = await Exchange.deploy(verifier.address);
	await exchange.deployed();
	console.log(`Verifier contract address: ${verifier.address}`);
	console.log(`TokenExchange contract address: ${exchange.address}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

	//SpendVerifier
	//Token
	//TokenExchange