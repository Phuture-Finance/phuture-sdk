import {Erc20, StandardPermitArguments} from "@phuture/erc-20";
import {expect} from "chai";
import {BigNumber, constants, Signer} from "ethers";
import {AutoRouter} from "../src";
import {IndexRouter} from "@phuture/index-router";
import {Index} from "@phuture/index";
import {IndexRouter as IndexRouterContractInterface} from "@phuture/index-router/dist/src/types";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";
import {ZeroExAggregator} from "@phuture/0x-aggregator";
import {Mock} from "moq.ts";

describe("AutoRouter", () => {
	const usdcTokenAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
	const indexTokenAddress = "0x1291ba229d69b630f12320a72f43ee17df07425d";

	const permitOptions: Omit<StandardPermitArguments, "amount"> = {
		v: 0,
		r: "0x0000000000000000000000000000000000000000000000000000000000000001",
		s: "0x0000000000000000000000000000000000000000000000000000000000000002",
		deadline: 123,
	};

	let indexRouterContract: DeepMockProxy<IndexRouterContractInterface>;
	let indexRouter: DeepMockProxy<IndexRouter>;
	let zeroAggregator: DeepMockProxy<ZeroExAggregator>;
	let signerInterface: DeepMockProxy<Signer>;
	let indexTokenInterface: DeepMockProxy<Index>;
	let erc20: DeepMockProxy<Erc20>;

	beforeAll(async () => {
		indexRouterContract = mockDeep<IndexRouterContractInterface>();
		await indexRouterContract.WETH.mockImplementation(
			async () => "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
		);

		indexRouter = mockDeep<IndexRouter>();
		indexRouter.weth.mockImplementation(async () =>
			constants.AddressZero
		);
		indexRouter.mintSwapStatic.mockImplementation(async () =>
			BigNumber.from(1000)
		);
		indexRouter.burnSwapStatic.mockImplementation(async () =>
			BigNumber.from(1000)
		);
		Object.defineProperty(indexRouter, "address", {
			get: () => constants.AddressZero,
		});

		erc20 = mockDeep<Erc20>();
		Object.defineProperty(erc20, "address", {
			get: () => usdcTokenAddress,
		});

		zeroAggregator = mockDeep<ZeroExAggregator>();
		zeroAggregator.quote.mockImplementation(async () => {
			return {
				to: usdcTokenAddress,
				data: "1",
				buyAmount: "10",
				sellAmount: "100",
			};
		});
		zeroAggregator.price.mockImplementation(async () => {
			return {
				to: usdcTokenAddress,
				data: "1",
				buyAmount: "10",
				sellAmount: "100",
			};
		});

		signerInterface = mockDeep<Signer>();
		signerInterface.call.mockImplementation(async () => "123");
		signerInterface.getAddress.mockImplementation(
			async () => constants.AddressZero
		);

		indexTokenInterface = mockDeep<Index>();
		Object.defineProperty(indexTokenInterface, "address", {
			get: () => indexTokenAddress,
		});
	});


	describe("Auto Buy: ", () => {
		it("running autoBuy function when 0x amount is more beneficial than IndexRouter's mintSwap", async () => {
			zeroAggregator.price.mockImplementation(async () => {
				return {
					to: usdcTokenAddress,
					data: "1",
					buyAmount: "10000000000",
					sellAmount: "100",
				};
			});
			indexTokenInterface.scaleAmount.mockImplementation(async () => {
				return {
					amountToSell: BigNumber.from(1000000000),
					amounts: {["0x0001"]: BigNumber.from(10)},
				};
			});
			indexRouter.mintSwapStatic.mockImplementation(async () =>
				BigNumber.from(1)
			);
			const zeroAggregatorInterface = zeroAggregator as ZeroExAggregator;
			const autoRouter = new AutoRouter(
				indexRouter,
				zeroAggregatorInterface,
			);
			const result = await autoRouter.autoBuy(
				indexTokenInterface,
				"100000000000000000",
				erc20
			);
			expect(result).to.not.null;
		});
		it("running autoBuy function when 0x amount is more beneficial than IndexRouter's mintSwap(with permit options)", async () => {
			zeroAggregator.price.mockImplementation(async () => {
				return {
					to: usdcTokenAddress,
					data: "1",
					buyAmount: "10000000000",
					sellAmount: "100",
				};
			});
			indexTokenInterface.scaleAmount.mockImplementation(async () => {
				return {
					amountToSell: BigNumber.from(1000000000),
					amounts: {["0x0001"]: BigNumber.from(10)},
				};
			});
			const zeroAggregatorInterface = zeroAggregator as ZeroExAggregator;
			const autoRouter = new AutoRouter(
				indexRouter,
				zeroAggregatorInterface,
			);
			const result = await autoRouter.autoBuy(
				indexTokenInterface,
				"1000000000",
				erc20,
				permitOptions
			);
			expect(result).to.not.null;
		});
		it("running autoBuy function when IndexRouter's mintSwap amount is more beneficial than 0x", async () => {
			zeroAggregator.price.mockImplementation(async () => {
				return {
					to: usdcTokenAddress,
					data: "1",
					buyAmount: "10000000000",
					sellAmount: "100",
				};
			});
			indexTokenInterface.scaleAmount.mockImplementation(async () => {
				return {
					amountToSell: BigNumber.from(1000000000),
					amounts: {["0x0001"]: BigNumber.from(10)},
				};
			});
			const zeroAggregatorInterface = zeroAggregator as ZeroExAggregator;
			const autoRouter = new AutoRouter(
				indexRouter,
				zeroAggregatorInterface,
			);
			const result = await autoRouter.autoBuy(
				indexTokenInterface,
				"1000000000",
				erc20
			);
			expect(result).to.not.null;
		});
		it("running autoBuy function when IndexRouter's mintSwap amount is more beneficial than 0x(with permit options)", async () => {
			zeroAggregator.price.mockImplementation(async () => {
				return {
					to: usdcTokenAddress,
					data: "1",
					buyAmount: "10000000000",
					sellAmount: "100",
				};
			});
			indexTokenInterface.scaleAmount.mockImplementation(async () => {
				return {
					amountToSell: BigNumber.from(1000000000),
					amounts: {["0x0001"]: BigNumber.from(10)},
				};
			});
			indexRouter.mintSwapStatic.mockImplementation(async () =>
				BigNumber.from(100000000000)
			);
			const zeroAggregatorInterface = zeroAggregator as ZeroExAggregator;
			const autoRouter = new AutoRouter(
				indexRouter,
				zeroAggregatorInterface
			);
			const result = await autoRouter.autoBuy(
				indexTokenInterface,
				"1000000000",
				erc20,
				permitOptions
			);
			expect(result).to.not.null;
		});
	});
	describe("Auto Sell: ", () => {
		it("running autoSell function when AutoRouter interface was created from Index interface & 0x amount is more beneficial than IndexRouter's mintSwap", async () => {
			zeroAggregator.price.mockImplementation(async () => {
				return {
					to: usdcTokenAddress,
					data: "1",
					buyAmount: "10000000000",
					sellAmount: "100",
				};
			});

			indexTokenInterface.scaleAmount.mockImplementation(async () => {
				return {
					amountToSell: BigNumber.from(1000000000),
					amounts: {["0x0001"]: BigNumber.from(10)},
				};
			});
			const indexRouterInterface = new Mock<IndexRouter>().object();
			const zeroAggregatorInterface = zeroAggregator as ZeroExAggregator;
			const autoRouter = new AutoRouter(
				indexRouterInterface,
				zeroAggregatorInterface
			);
			const result = await autoRouter.autoSell(indexTokenInterface, "1000");
			expect(result).to.not.null;
		});
		it("running autoSell function when 0x amount is more beneficial than IndexRouter's mintSwap", async () => {
			zeroAggregator.price.mockImplementation(async () => {
				return {
					to: usdcTokenAddress,
					data: "1",
					buyAmount: "10000000000",
					sellAmount: "100",
				};
			});

			indexTokenInterface.scaleAmount.mockImplementation(async () => {
				return {
					amountToSell: BigNumber.from(1000000000),
					amounts: {["0x0001"]: BigNumber.from(10)},
				};
			});
			const indexRouterInterface = new Mock<IndexRouter>().object();
			const zeroAggregatorInterface = zeroAggregator as ZeroExAggregator;
			const autoRouter = new AutoRouter(
				indexRouterInterface,
				zeroAggregatorInterface,
			);
			const result = await autoRouter.autoSell(indexTokenInterface, "1000");
			expect(result).to.not.null;
		});
		it("running autoSell function when IndexRouter's mintSwap amount is more beneficial than 0x(with permit options)", async () => {
			zeroAggregator.price.mockImplementation(async () => {
				return {
					to: usdcTokenAddress,
					data: "1",
					buyAmount: "10000000000",
					sellAmount: "100",
				};
			});

			indexTokenInterface.scaleAmount.mockImplementation(async () => {
				return {
					amountToSell: BigNumber.from(1000000000),
					amounts: {["0x0001"]: BigNumber.from(10)},
				};
			});

			indexRouter.burnSwapStatic.mockImplementation(async () =>
				BigNumber.from(100000000000)
			);
			const zeroAggregatorInterface = zeroAggregator as ZeroExAggregator;
			const autoRouter = new AutoRouter(
				indexRouter,
				zeroAggregatorInterface
			);
			const result = await autoRouter.autoSell(
				indexTokenInterface,
				"1000",
				usdcTokenAddress,
				permitOptions
			);
			expect(result).to.not.null;
		});
	});
});
