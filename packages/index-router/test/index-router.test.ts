/** @test {indexRouter} */
test("indexRouter", () => {});

import { expect } from "chai";
import { CompositeExpressionReflector, Mock } from "moq.ts";
import { BigNumber, constants, ethers, Signer } from "ethers";

import {
	IndexRouter as IndexRouterContractInterface,
	IndexRouter__factory,
} from "../src/types";
import { DefaultIndexRouterAddress, IndexRouter } from "../src";
import { IIndexRouter } from "../src/types/IndexRouter";
import { Erc20 } from "@phuture/erc-20";
import { JsonRpcProvider } from "@ethersproject/providers";

describe("IndexRouter", () => {
	const routerContract = new Mock<IndexRouterContractInterface>()
		.setup((c) => c.address)
		.returns(constants.AddressZero)
		.object();
	const signer = new ethers.providers.JsonRpcProvider().getSigner();

	// it("should throw error on invalid address", async () => {
	// 	const contractAddress = "0x123";
	// 	await expect(
	// 		() =>
	// 			new IndexRouter(contractAddress, ethers.providers.getDefaultProvider())
	// 	).to.throw(TypeError, `Invalid contract address: ${contractAddress}`);
	// });
	// it("create IndexRouter instance from address", () => {
	// 	// const router = new IndexRouter(constants.AddressZero);
	// 	const router = new IndexRouter(
	// 		routerContract,
	// 		ethers.getDefaultProvider(),
	// 		signer
	// 	);
	// 	expect(router.contract.address).to.eq(constants.AddressZero);
	// 	expect(router.contract.provider._isProvider).to.be.true;
	// });

	it("should create IndexRouter instance from contract", () => {
		// const router = new IndexRouter(routerContract);
		const router = new IndexRouter(
			routerContract,
			ethers.getDefaultProvider(),
			signer
		);
		expect(router.contract.address).to.eq(constants.AddressZero);
	});

	describe("IndexRouter constructed", () => {
		let contract: IndexRouter;

		beforeAll(async () => {
			// const routerContract = new Mock<IndexRouterContractInterface>()
			// 	.setup((c) => c.address)
			// 	.returns(DefaultIndexRouterAddress.Mainnet)
			// 	.object();
			const signer = new ethers.providers.JsonRpcProvider(
				"https://chain.dev.phuture.finance"
			).getSigner();
			const registry = new IndexRouter__factory(signer).attach(
				DefaultIndexRouterAddress.Mainnet
			);
			console.log("SIGNER: ", signer);

			contract = new IndexRouter(
				routerContract,
				ethers.getDefaultProvider(),
				signer
			);
		});

		it("check if mintSwap return something", async () => {
			const erc20 = new Erc20("0x1f9840a85d5af5bf1d1762f925bdaddc4201f984");
			const options = new Mock<IIndexRouter.MintSwapParamsStruct>()
				.setup((c) => c.index)
				.returns("0xc11f8e173ee67ffa7bbdd185d2399994aad23ec6")
				.setup((c) => c.quotes)
				.returns([
					{
						asset: "0x00",
						swapTarget: "1",
						buyAssetMinAmount: "0",
						assetQuote: "1",
					},
					{
						asset: "0x01",
						swapTarget: "2",
						buyAssetMinAmount: "0",
						assetQuote: "2",
					},
				])
				.setup((c) => c.recipient)
				.returns(constants.AddressZero)
				.object();
			const response = await contract.mint(options, "0", erc20);
			expect(response).to.not.be.null;
		});

		it("check if mintSwapValue return something", async () => {
			const options = new Mock<IIndexRouter.MintSwapValueParamsStruct>()
				.setup((c) => c.index)
				.returns("0xc11f8e173ee67ffa7bbdd185d2399994aad23ec6")
				.setup((c) => c.quotes)
				.returns([
					{
						asset: "0x00",
						swapTarget: "1",
						buyAssetMinAmount: "0",
						assetQuote: "1",
					},
					{
						asset: "0x01",
						swapTarget: "2",
						buyAssetMinAmount: "0",
						assetQuote: "2",
					},
				])
				.setup((c) => c.recipient)
				.returns(constants.AddressZero)
				.object();
			const response = await contract.mint(options, "123");
			expect(response).to.not.be.null;
		});
	});
});
