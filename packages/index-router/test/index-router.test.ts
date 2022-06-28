import {
	setOfAssets,
	Erc20Permit,
	StandardPermitArguments,
	Erc20,
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
		const router = new IndexRouter(signer, routerContract.address);
		expect(router.contract.address).to.eq(constants.AddressZero);
	});

	it("get signer with getter function", () => {
		const router = new IndexRouter(signer, routerContract.address);
		expect(router.signer).to.eq(signer);
	});

	describe("Setters: ", () => {
		const sameRouterOne = new IndexRouter(
			signer,
			constants.AddressZero.slice(0, -1).concat("1")
		);
		const sameRouterTwo = new IndexRouter(
			signer,
			constants.AddressZero.slice(0, -1).concat("1")
		);
		beforeAll(async () => {
			const createdSigner = ethers.Wallet.fromMnemonic(
				"route dentist belt excess hire crawl tourist price damp slight cotton whip"
			).connect(ethers.getDefaultProvider());
			sameRouterOne.signer = await createdSigner;
		});

		it("set a new signer with setter function", async () => {
			expect(sameRouterOne.signer.getAddress()).to.not.eq(
				sameRouterTwo.signer.getAddress()
			);
		});
	});

	describe("IndexRouter constructed", () => {
		const randomQuotes = [
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
		];
		describe("MINT:", () => {
			let mintSwapOptions: IIndexRouter.MintSwapParamsStruct;
			const contract = new Mock<IndexRouterContractInterface>()
				.setup((c) => c.address)
				.returns(DefaultIndexRouterAddress.Mainnet);

			beforeAll(async () => {
				mintSwapOptions = {
					index: "0xc11f8e173ee67ffa7bbdd185d2399994aad23ec6",
					inputToken: setOfAssets.mainnet.usdc,
					amountInInputToken: "1",
					recipient: await signer.getAddress(),
					quotes: randomQuotes,
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

			it("mint functions throws on 0 allowance", async () => {
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
		});
		describe("BURN:", () => {
			let burnWithPermitOptions: IIndexRouter.BurnParamsStruct;
			let burnSwapWithPermitOptions: IIndexRouter.BurnSwapParamsStruct;

			const burnPermitArguments: Omit<StandardPermitArguments, "amount"> = {
				v: 0,
				r: "0x0000000000000000000000000000000000000000000000000000000000000001",
				s: "0x0000000000000000000000000000000000000000000000000000000000000002",
				deadline: constants.MaxUint256,
			};
			const contract = new Mock<IndexRouterContractInterface>()
				.setup((c) => c.address)
				.returns(DefaultIndexRouterAddress.Mainnet);

			beforeAll(async () => {
				burnWithPermitOptions = {
					index: DefaultIndexRouterAddress.Mainnet,
					amount: "0",
					recipient: await signer.getAddress(),
				};
				burnSwapWithPermitOptions = {
					index: DefaultIndexRouterAddress.Mainnet,
					amount: "0",
					outputAsset: "asset",
					recipient: await signer.getAddress(),
					quotes: randomQuotes,
				};
			});
			it("burnWithPermit return something", async () => {
				const routerContract = contract
					.setup(async (c) =>
						c.burnWithPermit(
							burnWithPermitOptions,
							burnPermitArguments.deadline,
							burnPermitArguments.v,
							burnPermitArguments.r,
							burnPermitArguments.s
						)
					)
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(signer, routerContract);

				const response = await router.burn(
					burnWithPermitOptions,
					"0",
					undefined,
					burnPermitArguments
				);
				expect(response).to.not.be.null;
			});
			it("burnSwapValueWithPermit return something", async () => {
				const routerContract = contract
					.setup(async (c) =>
						c.burnSwapValueWithPermit(
							burnSwapWithPermitOptions,
							burnPermitArguments.deadline,
							burnPermitArguments.v,
							burnPermitArguments.r,
							burnPermitArguments.s
						)
					)
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(signer, routerContract);

				const response = await router.burn(
					burnWithPermitOptions,
					"0",
					new Erc20Permit(signer, setOfAssets.mainnet.weth),
					burnPermitArguments
				);
				expect(response).to.not.be.null;
			});

			it("burnSwapWithPermit return something", async () => {
				const routerContract = contract
					.setup(async (c) =>
						c.burnSwapWithPermit(
							burnSwapWithPermitOptions,
							burnPermitArguments.deadline,
							burnPermitArguments.v,
							burnPermitArguments.r,
							burnPermitArguments.s
						)
					)
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(signer, routerContract);

				const response = await router.burn(
					burnWithPermitOptions,
					"0",
					new Erc20Permit(signer, setOfAssets.mainnet.usdc),
					burnPermitArguments
				);
				expect(response).to.not.be.null;
			});

			it("burn return something", async () => {
				const signerAddress = await signer.getAddress();

				const routerContract = contract
					.setup(async (c) => c.burn(burnWithPermitOptions))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(signer, routerContract);

				const erc20 = new Mock<Erc20Permit>()
					.setup((c) =>
						c.contract.allowance(signerAddress, burnWithPermitOptions.index)
					)
					.returnsAsync(constants.MaxUint256)
					.setup((c) => c.contract.address)
					.returns(burnWithPermitOptions.index)
					.object();

				const response = await router.burn(
					burnWithPermitOptions,
					burnWithPermitOptions.amount,
					erc20
				);
				expect(response).to.not.be.null;
			});

			it("burnSwapValue return something", async () => {
				const signerAddress = await signer.getAddress();

				const routerContract = contract
					.setup(async (c) => c.burnSwapValue(burnSwapWithPermitOptions))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(signer, routerContract);

				const erc20 = new Mock<Erc20Permit>()
					.setup((c) =>
						c.contract.allowance(signerAddress, burnWithPermitOptions.index)
					)
					.returnsAsync(constants.MaxUint256)
					.setup((c) => c.contract.address)
					.returns(setOfAssets.mainnet.weth)
					.object();

				const response = await router.burn(
					burnWithPermitOptions,
					burnWithPermitOptions.amount,
					erc20
				);
				expect(response).to.not.be.null;
			});

			it("burnSwap return something", async () => {
				const signerAddress = await signer.getAddress();

				const routerContract = contract
					.setup(async (c) => c.burnSwap(burnSwapWithPermitOptions))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(signer, routerContract);

				const erc20 = new Mock<Erc20Permit>()
					.setup((c) =>
						c.contract.allowance(signerAddress, burnWithPermitOptions.index)
					)
					.returnsAsync(constants.MaxUint256)
					.setup((c) => c.contract.address)
					.returns(setOfAssets.mainnet.usdc)
					.object();

				const response = await router.burn(
					burnWithPermitOptions,
					burnWithPermitOptions.amount,
					erc20
				);
				expect(response).to.not.be.null;
			});

			// it("burn functions throws on 0 allowance", async () => {});
		});
	});
});
