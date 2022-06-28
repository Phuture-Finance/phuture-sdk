import { expect } from "chai";
import { BigNumber, constants, ethers, Signer } from "ethers";
import { Mock } from "moq.ts";
import { Index } from "../src";
import {
	BaseIndex as BaseIndexContractInterface,
	BaseIndex__factory,
} from "../src/types";

describe("Index", () => {
	const signer: Signer = ethers.Wallet.createRandom();
	const contractAddress = "0xf9ccb834adbe4591fd517aa69a24bf97d1386092";
	const indexContract = BaseIndex__factory.connect(contractAddress, signer);

	it("create Index instance from address", () => {
		const index = new Index(signer, contractAddress);
		expect(index.address).to.be.eq(contractAddress);
	});

	it("create Index instance from contract", () => {
		const index = new Index(signer, indexContract);
		expect(index.address).to.be.eq(contractAddress);
	});

	describe("Index constructed", () => {
		let indexContract: Index;

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
			indexContract = new Index(signer, mockedContract);
		});

		it("#scaleAmount returns proper values", async () => {
			const { amounts, amountToSell } = await indexContract.scaleAmount(
				10000000000
			);

			expect(amounts).to.deep.eq({
				"0x01": BigNumber.from(6078431372),
				"0x02": BigNumber.from(3921568627),
			});
			expect(amountToSell.toNumber()).to.eq(9999999999);
		});
	});
});
