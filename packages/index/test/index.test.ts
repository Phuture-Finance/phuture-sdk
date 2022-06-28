import { expect } from "chai";
import { constants, ethers, Signer } from "ethers";
import { Mock } from "moq.ts";
import { Index } from "../src";
import {
	BaseIndex as BaseIndexContractInterface,
	BaseIndex__factory,
} from "../src/types";

describe("Index", () => {
	const signer: Signer = ethers.Wallet.createRandom();
	const contractAddress = "0xf9ccb834adbe4591fd517aa69a24bf97d1386092";
	const routerContract = BaseIndex__factory.connect(contractAddress, signer);

	it("create Index instance from address", () => {
		expect(() => new Index(signer, contractAddress)).not.to.be.null;
	});

	it("create Index instance from contract", () => {
		expect(() => new Index(signer, routerContract)).not.to.be.null;
	});

	describe("Index constructed", () => {
		let indexContract: Index;
		let baseIndexContract: BaseIndexContractInterface;

		beforeAll(async () => {
			const mockedContract = new Mock<BaseIndexContractInterface>()
				.setup((c) => c.address)
				.returns(constants.AddressZero)
				.setup(
					async (c) =>
						(await c.anatomy()) as { _assets: string[]; _weights: number[] }
				)
				.returnsAsync({ _assets: ["0x01", "0x02"], _weights: [155, 100] })
				.object();
			baseIndexContract = mockedContract;
			indexContract = new Index(signer, mockedContract);
		});

		it("scaleAmount function return some amountToSellQuoted", async () => {
			const indexScale = await indexContract.scaleAmount("10000000000");
			expect(async () => indexScale.amountToSellQuoted).not.to.be.null;
		});

		it("scaleAmount function return some amounts", async () => {
			const indexScale = await indexContract.scaleAmount("10000000000");
			expect(async () => indexScale.amounts).not.to.be.null;
		});
	});
});
