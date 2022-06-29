import { Erc20, Erc20Permit, StandardPermitArguments } from "@phuture/erc-20";
import { InsufficientAllowanceError } from "@phuture/errors";
import { expect } from "chai";
import { BigNumber, constants, ethers, Signer } from "ethers";
import { ContractTransaction } from "ethers/lib/ethers";
import { Mock, PlayTimes } from "moq.ts";
import { DefaultIndexRouterAddress, IndexRouter } from "../src";
import { IndexRouter as IndexRouterContractInterface } from "../src/types";
import { IIndexRouter } from "../src/types/IndexRouter";

describe("IndexRouter", () => {
	const signer: Signer = ethers.Wallet.createRandom().connect(
		ethers.getDefaultProvider()
	);
	const routerContract = new Mock<IndexRouterContractInterface>()
		.setup((c) => c.address)
		.returns(constants.AddressZero)
		.object();

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
					inputToken: "0x01",
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
			let burnParameters: IIndexRouter.BurnParamsStruct;
			let burnSwapParameters: IIndexRouter.BurnSwapParamsStruct;
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
				burnParameters = {
					index: DefaultIndexRouterAddress.Mainnet,
					amount: "0",
					recipient: await signer.getAddress(),
				};
				burnSwapParameters = {
					index: DefaultIndexRouterAddress.Mainnet,
					amount: "0",
					recipient: await signer.getAddress(),
					quotes: randomQuotes,
					outputAsset: "0x01",
				};
			});

			it("burnWithPermit return something", async () => {
				const routerContract = contract
					.setup(async (c) =>
						c.burnWithPermit(
							burnParameters,
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
					burnParameters.index,
					burnParameters.amount,
					burnParameters.recipient,
					burnPermitArguments
				);
				expect(response).to.not.be.null;
			});

			it("burn return something", async () => {
				const indexContract = new Mock<Erc20>()
					.setup((c) =>
						c.contract.allowance(burnParameters.recipient, burnParameters.index)
					)
					.returnsAsync(constants.MaxUint256)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();
				const routerContract = contract
					.setup(async (c) => c.burn(burnParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(signer, routerContract);
				const response = await router.burn(
					indexContract,
					burnParameters.amount,
					burnParameters.recipient
				);
				expect(response).to.not.be.null;
			});

			it("burn return info that allowance are insufficient ", async () => {
				const indexContract = new Mock<Erc20>()
					.setup((c) =>
						c.contract.allowance(burnParameters.recipient, burnParameters.index)
					)
					.returnsAsync(BigNumber.from(0))
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();
				const routerContract = contract
					.setup(async (c) => c.burn(burnParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(signer, routerContract);

				router
					.burn(indexContract, "1000", burnParameters.recipient)
					.catch((error) => {
						expect(error).to.be.instanceOf(InsufficientAllowanceError);
					});
			});

			it("burnSwapValueWithPermit return something", async () => {
				const indexContract = new Mock<Erc20>()
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();
				const routerContract = contract
					.setup(async (c) =>
						c.burnSwapValueWithPermit(
							burnSwapParameters,
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
				const response = await router.burnSwap(
					indexContract,
					"0",
					burnSwapParameters.recipient,
					{
						quotes: burnSwapParameters.quotes,
					},
					burnPermitArguments
				);
				expect(response).to.not.be.null;
			});
			it("burnSwapValue return something", async () => {
				const indexContract = new Mock<Erc20>()
					.setup((c) =>
						c.contract.allowance(burnParameters.recipient, burnParameters.index)
					)
					.returnsAsync(constants.MaxUint256)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();
				const routerContract = contract
					.setup(async (c) => c.burnSwapValue(burnSwapParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(signer, routerContract);
				const response = await router.burnSwap(
					indexContract,
					"0",
					burnSwapParameters.recipient,
					{
						quotes: burnSwapParameters.quotes,
					}
				);
				expect(response).to.not.be.null;
			});
			it("burnSwapWithPermit return something", async () => {
				const indexContract = new Mock<Erc20>()
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();
				const routerContract = contract
					.setup(async (c) =>
						c.burnSwapWithPermit(
							burnSwapParameters,
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
				const response = await router.burnSwap(
					indexContract,
					"0",
					burnSwapParameters.recipient,
					{
						outputAsset: burnSwapParameters.outputAsset,
						quotes: burnSwapParameters.quotes,
					},
					burnPermitArguments
				);
				expect(response).to.not.be.null;
			});
			it("burnSwap return something", async () => {
				const indexContract = new Mock<Erc20>()
					.setup((c) =>
						c.contract.allowance(burnParameters.recipient, burnParameters.index)
					)
					.returnsAsync(constants.MaxUint256)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();
				const routerContract = contract
					.setup(async (c) => c.burnSwap(burnSwapParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(signer, routerContract);

				const response = await router.burnSwap(
					indexContract,
					"0",
					burnSwapParameters.recipient,
					{
						outputAsset: burnSwapParameters.outputAsset,
						quotes: burnSwapParameters.quotes,
					}
				);
				expect(response).to.not.be.null;
			});
		});
	});
});
