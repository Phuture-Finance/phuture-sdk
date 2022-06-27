import {
	DefaultUsdcAddress,
	Erc20Permit,
	StandardPermitArguments,
} from "@phuture/erc-20";
import { expect } from "chai";
import { BigNumber, constants, ethers, Signer } from "ethers";
import { ContractTransaction } from "ethers/lib/ethers";
import { Mock, PlayTimes } from "moq.ts";
import { IndexRouter__factory } from "../dist/types";
import { DefaultIndexRouterAddress, IndexRouter } from "../src";
import { IndexRouter as IndexRouterContractInterface } from "../src/types";
import { IIndexRouter } from "../src/types/IndexRouter";

/** @test {indexRouter} */
describe("IndexRouter", () => {
	const signer: Signer = ethers.Wallet.createRandom().connect(
		ethers.getDefaultProvider()
	);
	const routerContract = new Mock<IndexRouterContractInterface>()
		.setup((c) => c.address)
		.returns(constants.AddressZero)
		.object();

	it("should throw error on invalid address", async () => {
		const contractAddress = "0x123";
		await expect(() => new IndexRouter(signer, contractAddress)).to.throw(
			TypeError,
			`Invalid contract address: ${contractAddress}`
		);
	});

	it("create IndexRouter instance from address", () => {
		const router = new IndexRouter(signer, routerContract);
		expect(router.contract.address).to.eq(constants.AddressZero);
	});

	it("should create IndexRouter instance from contract", () => {
		const routerContract = IndexRouter__factory.connect(
			DefaultIndexRouterAddress.Mainnet,
			signer
		);
		const router = new IndexRouter(signer, routerContract);
		expect(router.contract.address).to.eq(DefaultIndexRouterAddress.Mainnet);
	});

	describe("IndexRouter constructed", () => {
		let mintSwapOptions: IIndexRouter.MintSwapParamsStruct;
		const contract = new Mock<IndexRouterContractInterface>()
			.setup((c) => c.address)
			.returns(DefaultIndexRouterAddress.Mainnet);

		beforeAll(async () => {
			mintSwapOptions = {
				index: "0xc11f8e173ee67ffa7bbdd185d2399994aad23ec6",
				inputToken: DefaultUsdcAddress.Mainnet,
				amountInInputToken: "1",
				recipient: await signer.getAddress(),
				quotes: [
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
				],
			};
		});

		it("mintSwapValue return something", async () => {
			const routerContract = contract
				.setup(async (c) => c.mintSwapValue(mintSwapOptions))
				.play(PlayTimes.Once())
				.returnsAsync(new Mock<ContractTransaction>().object())
				.object();
			const router = new IndexRouter(signer, routerContract);

			const response = await router.mint(
				mintSwapOptions,
				mintSwapOptions.amountInInputToken
			);
			expect(response).to.not.be.null;
		});

		it("mintSwap return something", async () => {
			const signerAddress = await signer.getAddress();

			const routerContract = contract
				.setup(async (c) => c.mintSwap(mintSwapOptions))
				.play(PlayTimes.Once())
				.returnsAsync(new Mock<ContractTransaction>().object())
				.object();
			const router = new IndexRouter(signer, routerContract);

			const erc20 = new Mock<Erc20Permit>()
				.setup((c) =>
					c.contract.allowance(signerAddress, router.contract.address)
				)
				.returnsAsync(constants.MaxUint256)
				.object();

			const response = await router.mint(
				mintSwapOptions,
				mintSwapOptions.amountInInputToken,
				erc20
			);
			expect(response).to.not.be.null;
		});

		it("mintSwap throws on 0 allowance", async () => {
			const signerAddress = await signer.getAddress();

			const routerContract = contract
				.setup(async (c) => c.mintSwap(mintSwapOptions))
				.play(PlayTimes.Once())
				.returnsAsync(new Mock<ContractTransaction>().object())
				.object();
			const router = new IndexRouter(signer, routerContract);

			const erc20 = new Mock<Erc20Permit>()
				.setup((c) =>
					c.contract.allowance(signerAddress, router.contract.address)
				)
				.returnsAsync(BigNumber.from(0))
				.object();

			try {
				await router.mint(
					mintSwapOptions,
					mintSwapOptions.amountInInputToken,
					erc20
				);
			} catch (error) {
				expect(error).to.be.instanceOf(Error);
			}
		});

		it("mintSwapWithPermit return something", async () => {
			const permitArguments: StandardPermitArguments = {
				v: 0,
				r: "0x0000000000000000000000000000000000000000000000000000000000000001",
				s: "0x0000000000000000000000000000000000000000000000000000000000000002",
				amount: mintSwapOptions.amountInInputToken,
				deadline: constants.MaxUint256,
			};
			const routerContract = contract
				.setup(async (c) =>
					c.mintSwapWithPermit(
						mintSwapOptions,
						permitArguments.deadline,
						permitArguments.v,
						permitArguments.r,
						permitArguments.s
					)
				)
				.play(PlayTimes.Once())
				.returnsAsync(new Mock<ContractTransaction>().object())
				.object();
			const router = new IndexRouter(signer, routerContract);

			const erc20permit = new Mock<Erc20Permit>().object();

			const response = await router.mint(
				mintSwapOptions,
				mintSwapOptions.amountInInputToken,
				erc20permit,
				permitArguments
			);
			expect(response).to.not.be.null;
		});
	});
});
