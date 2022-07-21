import {Erc20, Erc20Permit, StandardPermitArguments} from "@phuture/erc-20";
import {InsufficientAllowanceError} from "@phuture/errors";
import {expect} from "chai";
import {BigNumber, constants} from "ethers";
import {ContractTransaction} from "ethers/lib/ethers";
import {Mock, PlayTimes} from "moq.ts";
import {DefaultIndexRouterAddress, IndexRouter} from "../src";
import {IndexRouter as IndexRouterContractInterface} from "../src/types";
import {IIndexRouter} from "../src/types/IndexRouter";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";
import {Account} from "@phuture/account";

describe("IndexRouter", () => {
	const account = new Mock<Account>()
		.setup(async (a) => a.address())
		.returnsAsync(constants.AddressZero)
		.object();

	const routerContract = new Mock<IndexRouterContractInterface>()
		.setup((c) => c.address)
		.returns(constants.AddressZero)
		.object();

	it("create IndexRouter instance from address", () => {
		const router = new IndexRouter(account, routerContract.address);
		expect(router.contract.address).to.eq(constants.AddressZero);
	});

	it("get account with getter function", () => {
		const router = new IndexRouter(account, routerContract.address);
		expect(router.account).to.eq(account);
	});

	describe("Setters: ", () => {
		const router = new IndexRouter(
			account,
			constants.AddressZero.slice(0, -1).concat("1")
		);

		it("set a new account with setter function", async () => {
			router.account = new Mock<Account>()
				.setup(async (a) => a.address())
				.returnsAsync(constants.AddressZero)
				.object();

			expect(router.account.address()).to.not.eq(
				router.account.address()
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

		describe("# mint:", () => {
			let mintSwapOptions: IIndexRouter.MintSwapParamsStruct;
			const contract = new Mock<IndexRouterContractInterface>()
				.setup((c) => c.address)
				.returns(DefaultIndexRouterAddress.Mainnet);

			beforeAll(async () => {
				mintSwapOptions = {
					index: "0xc11f8e173ee67ffa7bbdd185d2399994aad23ec6",
					inputToken: "0x01",
					amountInInputToken: "1",
					recipient: await account.address(),
					quotes: randomQuotes,
				};
			});

			it("mintSwapValue return something", async () => {
				const routerContract = contract
					.setup(async (c) => c.mintSwapValue(mintSwapOptions))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(account, routerContract);

				const response = await router.mintSwap(
					mintSwapOptions,
					mintSwapOptions.amountInInputToken
				);
				expect(response).to.not.be.null;
			});

			it("mintSwap return something", async () => {
				const accountAddress = await account.address();

				const routerContract = contract
					.setup(async (c) => c.mintSwap(mintSwapOptions))
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(account, routerContract);

				const erc20 = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, mintSwapOptions.amountInInputToken)
					)
					.returnsAsync(true)
					.object();

				const response = await router.mintSwap(
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
				const router = new IndexRouter(account, routerContract);

				const erc20permit = new Mock<Erc20Permit>().object();

				const response = await router.mintSwap(
					mintSwapOptions,
					mintSwapOptions.amountInInputToken,
					erc20permit,
					permitArguments
				);
				expect(response).to.not.be.null;
			});

			it("mint functions throws on 0 allowance", async () => {
				const routerContract = contract
					.setup(async (c) => c.mintSwap(mintSwapOptions))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(account, routerContract);

				const erc20 = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, 0)
					)
					.returnsAsync(false)
					.object();

				try {
					await router.mintSwap(
						mintSwapOptions,
						mintSwapOptions.amountInInputToken,
						erc20
					);
				} catch (error) {
					expect(error).to.be.instanceOf(Error);
				}
			});
		});

		describe("# mintSwap static:", () => {
			let mintSwapOptions: IIndexRouter.MintSwapParamsStruct;
			let mockContract: DeepMockProxy<IndexRouterContractInterface>;
			let permitArguments: StandardPermitArguments;

			beforeAll(async () => {
				mintSwapOptions = {
					index: "0xc11f8e173ee67ffa7bbdd185d2399994aad23ec6",
					inputToken: "0x01",
					amountInInputToken: "1",
					recipient: await account.address(),
					quotes: randomQuotes,
				};
				permitArguments = {
					v: 0,
					r: "0x0000000000000000000000000000000000000000000000000000000000000001",
					s: "0x0000000000000000000000000000000000000000000000000000000000000002",
					amount: mintSwapOptions.amountInInputToken,
					deadline: constants.MaxUint256,
				};

				mockContract = mockDeep<IndexRouterContractInterface>();
				await mockContract.callStatic.mintSwapValue(mintSwapOptions);
				await mockContract.callStatic.mintSwap(mintSwapOptions);
				await mockContract.callStatic.mintSwapWithPermit(
					mintSwapOptions,
					permitArguments.deadline,
					permitArguments.v,
					permitArguments.r,
					permitArguments.s
				);
			});

			it("mintSwapValue static return something", async () => {
				const router = new IndexRouter(account, mockContract);

				const response = await router.mintSwapStatic(
					mintSwapOptions,
					mintSwapOptions.amountInInputToken
				);
				expect(response).to.not.be.null;
			});

			it("mintSwap static return something", async () => {
				const router = new IndexRouter(account, mockContract);

				const erc20 = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, mintSwapOptions.amountInInputToken)
					)
					.returnsAsync(true)
					.object();

				const response = await router.mintSwapStatic(
					mintSwapOptions,
					mintSwapOptions.amountInInputToken,
					erc20
				);
				expect(response).to.not.be.null;
			});

			it("mintSwapWithPermit static return something", async () => {
				const router = new IndexRouter(account, mockContract);

				const erc20permit = new Mock<Erc20Permit>().object();

				const response = await router.mintSwapStatic(
					mintSwapOptions,
					mintSwapOptions.amountInInputToken,
					erc20permit,
					permitArguments
				);
				expect(response).to.not.be.null;
			});

			it("mintSwap static functions throws on 0 allowance", async () => {
				const router = new IndexRouter(account, mockContract);

				const erc20 = new Mock<Erc20Permit>()
					.setup(async (c) =>
						c.checkAllowance(router.address, mintSwapOptions.amountInInputToken)
					)
					.returnsAsync(false)
					.object();

				try {
					await router.mintSwapStatic(
						mintSwapOptions,
						mintSwapOptions.amountInInputToken,
						erc20
					);
				} catch (error) {
					expect(error).to.be.instanceOf(InsufficientAllowanceError);
				}
			});
		});

		describe("# mintAmounts:", () => {
			const contract = new Mock<IndexRouterContractInterface>()
				.setup((c) => c.address)
				.returns(DefaultIndexRouterAddress.Mainnet);

			it("mintAmounts with native token", async () => {
				const accountAddress = await account.address();
				const nativeOption = {
					inputToken: "0x0",
					amountInInputToken: "100",
					quotes: randomQuotes,
					index: DefaultIndexRouterAddress.Mainnet,
					recipient: accountAddress,
				};
				const routerContract = contract
					.setup(async (c) => c.mintSwapIndexAmount(nativeOption))
					.returnsAsync(BigNumber.from(10))
					.setup(async (c) => c.WETH())
					.returnsAsync(constants.AddressZero)
					.object();
				const router = new IndexRouter(account, routerContract);

				const result = await router.mintIndexAmount(
					nativeOption.index,
					nativeOption.amountInInputToken,
					nativeOption.quotes
				);
				expect(result).to.not.be.null;
			});

			it("mintAmounts with single(not native) token", async () => {
				const singleOption: IIndexRouter.MintSwapParamsStruct = {
					inputToken: "0x0",
					amountInInputToken: "100",
					quotes: randomQuotes,
					index: DefaultIndexRouterAddress.Mainnet,
					recipient: await account.address(),
				};
				const routerContract = contract
					.setup(async (c) => c.mintSwapIndexAmount(singleOption))
					.play(PlayTimes.Once())
					.returnsAsync(BigNumber.from(10))
					.object();
				const router = new IndexRouter(account, routerContract);
				const result = await router.mintIndexAmount(
					singleOption.index,
					singleOption.amountInInputToken,
					singleOption.quotes,
					singleOption.inputToken
				);
				expect(result).to.not.be.null;
			});
		});

		describe("# burn:", () => {
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
					recipient: await account.address(),
				};
				burnSwapParameters = {
					index: DefaultIndexRouterAddress.Mainnet,
					amount: "0",
					recipient: await account.address(),
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
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();
				const router = new IndexRouter(account, routerContract);
				const response = await router.burn(
					burnParameters.index,
					burnParameters.amount,
					burnParameters.recipient,
					burnPermitArguments
				);
				expect(response).to.not.be.null;
			});

			it("burn return something", async () => {
				const routerContract = contract
					.setup(async (c) => c.burn(burnParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(account, routerContract);
				const indexContract = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, burnParameters.amount)
					)
					.returnsAsync(true)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

				const response = await router.burn(
					indexContract,
					burnParameters.amount,
					burnParameters.recipient
				);
				expect(response).to.not.be.null;
			});

			it("burn return info that allowance are insufficient", async () => {
				const routerContract = contract
					.setup(async (c) => c.burn(burnParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(account, routerContract);
				const indexContract = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, burnParameters.amount)
					)
					.returnsAsync(false)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

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
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(account, routerContract);
				const response = await router.burnSwap(
					indexContract,
					"0",
					burnSwapParameters.recipient,
					{
						quotes: burnSwapParameters.quotes,
						permitOptions: burnPermitArguments,
					}
				);
				expect(response).to.not.be.null;
			});

			it("burnSwapValue return something", async () => {
				const routerContract = contract
					.setup(async (c) => c.burnSwapValue(burnSwapParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(account, routerContract);
				const indexContract = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, burnParameters.amount)
					)
					.returnsAsync(true)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

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

			it("burnSwapValue return info that allowance are insufficient ", async () => {
				const routerContract = contract
					.setup(async (c) => c.burnSwapValue(burnSwapParameters))
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(account, routerContract);
				const indexContract = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, burnParameters.amount)
					)
					.returnsAsync(false)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

				router
					.burnSwap(indexContract, "100", burnSwapParameters.recipient, {
						quotes: burnSwapParameters.quotes,
					})
					.catch((error) => {
						expect(error).to.be.instanceOf(InsufficientAllowanceError);
					});
			});

			it("burnSwapWithPermit return something", async () => {
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
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(account, routerContract);
				const indexContract = new Mock<Erc20>()
					.setup((c) => c.contract.address)
					.returns("0x01")
					.setup(async (c) => c.checkAllowance(router.address, "100"))
					.returnsAsync(true)
					.object();

				const response = await router.burnSwap(
					indexContract,
					"100",
					burnSwapParameters.recipient,
					{
						outputAsset: burnSwapParameters.outputAsset,
						quotes: burnSwapParameters.quotes,
						permitOptions: burnPermitArguments,
					}
				);
				expect(response).to.not.be.null;
			});

			it("burnSwap return something", async () => {
				const routerContract = contract
					.setup(async (c) => c.burnSwap(burnSwapParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(account, routerContract);
				const indexContract = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, burnParameters.amount)
					)
					.returnsAsync(true)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

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

			it("burnSwap return info that allowance are insufficient ", async () => {
				const routerContract = contract
					.setup(async (c) => c.burnSwap(burnSwapParameters))
					.play(PlayTimes.Once())
					.returnsAsync(new Mock<ContractTransaction>().object())
					.object();

				const router = new IndexRouter(account, routerContract);
				const indexContract = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, burnParameters.amount)
					)
					.returnsAsync(false)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

				router
					.burnSwap(indexContract, "1000", burnSwapParameters.recipient, {
						outputAsset: burnSwapParameters.outputAsset,
						quotes: burnSwapParameters.quotes,
					})
					.catch((error) => {
						expect(error).to.be.instanceOf(InsufficientAllowanceError);
					});
			});
		});

		describe("# burn swap static:", () => {
			let burnParameters: IIndexRouter.BurnParamsStruct;
			let burnSwapParameters: IIndexRouter.BurnSwapParamsStruct;
			let mockContract: DeepMockProxy<IndexRouterContractInterface>;

			const burnPermitArguments: Omit<StandardPermitArguments, "amount"> = {
				v: 0,
				r: "0x0000000000000000000000000000000000000000000000000000000000000001",
				s: "0x0000000000000000000000000000000000000000000000000000000000000002",
				deadline: constants.MaxUint256,
			};

			beforeAll(async () => {
				burnParameters = {
					index: DefaultIndexRouterAddress.Mainnet,
					amount: "10",
					recipient: await account.address(),
				};
				burnSwapParameters = {
					index: DefaultIndexRouterAddress.Mainnet,
					amount: "0",
					recipient: await account.address(),
					quotes: randomQuotes,
					outputAsset: "0x01",
				};
				mockContract = mockDeep<IndexRouterContractInterface>();
				await mockContract.callStatic.burnSwap(burnSwapParameters);
				await mockContract.callStatic.burnSwapValueWithPermit(
					burnSwapParameters,
					burnPermitArguments.deadline,
					burnPermitArguments.v,
					burnPermitArguments.r,
					burnPermitArguments.s
				);
				await mockContract.callStatic.burnSwapValue(burnSwapParameters);
				await mockContract.callStatic.burnSwapValueWithPermit(
					burnSwapParameters,
					burnPermitArguments.deadline,
					burnPermitArguments.v,
					burnPermitArguments.r,
					burnPermitArguments.s
				);
			});

			it("burnSwapValueWithPermit static return something", async () => {
				const indexContract = new Mock<Erc20>()
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

				const router = new IndexRouter(account, mockContract);
				const response = await router.burnSwapStatic(
					indexContract,
					"0",
					burnSwapParameters.recipient,
					{
						quotes: burnSwapParameters.quotes,
						permitOptions: burnPermitArguments,
					}
				);
				expect(response).to.not.be.null;
			});

			it("burnSwapValue static return something", async () => {
				const router = new IndexRouter(account, mockContract);
				const indexContract = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, burnParameters.amount)
					)
					.returnsAsync(true)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

				const response = await router.burnSwapStatic(
					indexContract,
					burnParameters.amount,
					burnSwapParameters.recipient,
					{
						quotes: burnSwapParameters.quotes,
					}
				);
				expect(response).to.not.be.null;
			});

			it("burnSwapValue static return info that allowance are insufficient ", async () => {
				const indexContract = mockDeep<Erc20>();
				indexContract.contract.allowance.mockImplementation(async () =>
					BigNumber.from(0)
				);
				Object.defineProperty(indexContract, "address", {
					get: () => "0x1291ba229d69b630f12320a72f43ee17df07425d",
				});

				const router = new IndexRouter(account, mockContract);

				router
					.burnSwapStatic(indexContract, "100", burnSwapParameters.recipient, {
						quotes: burnSwapParameters.quotes,
					})
					.catch((error) => {
						expect(error).to.be.instanceOf(InsufficientAllowanceError);
					});
			});

			it("burnSwapWithPermit static return something", async () => {
				const indexContract = new Mock<Erc20>()
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

				const router = new IndexRouter(account, mockContract);
				const response = await router.burnSwapStatic(
					indexContract,
					"0",
					burnSwapParameters.recipient,
					{
						outputAsset: burnSwapParameters.outputAsset,
						quotes: burnSwapParameters.quotes,
						permitOptions: burnPermitArguments,
					}
				);
				expect(response).to.not.be.null;
			});

			it("burnSwap static return something", async () => {
				const router = new IndexRouter(account, mockContract);
				const indexContract = new Mock<Erc20>()
					.setup(async (c) =>
						c.checkAllowance(router.address, burnParameters.amount)
					)
					.returnsAsync(true)
					.setup((c) => c.contract.address)
					.returns("0x01")
					.object();

				const response = await router.burnSwapStatic(
					indexContract,
					burnParameters.amount,
					burnSwapParameters.recipient,
					{
						outputAsset: burnSwapParameters.outputAsset,
						quotes: burnSwapParameters.quotes,
					}
				);
				expect(response).to.not.be.null;
			});

			it("burnSwap static return info that allowance are insufficient ", async () => {
				const indexContract = mockDeep<Erc20>();
				indexContract.contract.allowance.mockImplementation(async () =>
					BigNumber.from(0)
				);
				Object.defineProperty(indexContract, "address", {
					get: () => "0x1291ba229d69b630f12320a72f43ee17df07425d",
				});

				const router = new IndexRouter(account, mockContract);

				router
					.burnSwapStatic(indexContract, "1000", burnSwapParameters.recipient, {
						outputAsset: burnSwapParameters.outputAsset,
						quotes: burnSwapParameters.quotes,
					})
					.catch((error) => {
						expect(error).to.be.instanceOf(InsufficientAllowanceError);
					});
			});
		});

		describe("# burnAmounts:", () => {
			const indexRouterContract = new Mock<IndexRouterContractInterface>()
				.setup((c) => c.address)
				.returns(DefaultIndexRouterAddress.Mainnet)
				.object();
			const amount = 1000000000000000;
			const contract = new Mock<IndexRouterContractInterface>()
				.setup((c) => c.address)
				.returns(DefaultIndexRouterAddress.Mainnet);

			it("burnAmounts with multi tokens", async () => {
				const routerContract = contract
					.setup(async (c) =>
						c.burnTokensAmount(indexRouterContract.address, amount)
					)
					.play(PlayTimes.Once())
					.returnsAsync([BigNumber.from(1000), BigNumber.from(2000)])
					.object();
				const router = new IndexRouter(account, routerContract);

				const result = await router.burnAmount(
					indexRouterContract.address,
					amount
				);
				expect(result).to.not.be.null;
			});

			it("burnAmounts with single tokens", async () => {
				const routerContract = contract
					.setup(async (c) =>
						c.burnTokensAmount(indexRouterContract.address, amount)
					)
					.play(PlayTimes.Once())
					.returnsAsync([BigNumber.from(1000), BigNumber.from(2000)])
					.object();
				const router = new IndexRouter(account, routerContract);
				const result = await router.burnAmount(
					indexRouterContract.address,
					amount,
					[1, 1]
				);

				expect(result).to.be.eq(3000);
			});
		});
	});
});
