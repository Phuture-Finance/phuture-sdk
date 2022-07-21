import {expect} from "chai";
import {BigNumber, constants} from "ethers";
import {Mock} from "moq.ts";
import {Index} from "../src";
import {BaseIndex} from "../src/types";
import {Account} from "@phuture/account";

describe("Index", () => {
	const account = new Mock<Account>().object();
	const contractAddress = "0xf9ccb834adbe4591fd517aa69a24bf97d1386092";
	let indexContract: BaseIndex

	beforeAll(async () => {
		indexContract = new Mock<BaseIndex>()
			.setup((c) => c.address)
			.returns(contractAddress)
			.setup(
				async (c) =>
					(await c.anatomy()) as { _assets: string[]; _weights: number[] }
			)
			.returnsAsync({_assets: ["0x01", "0x02"], _weights: [155, 100]})
			.object();
	});

	it("create Index instance from address", () => {
		const index = new Index(account, indexContract);
		expect(index.address).to.be.eq(indexContract);
	});

	describe("Index constructed", () => {
		const index = new Index(account, indexContract);

		it("#scaleAmount returns proper values", async () => {
			const {amounts, amountToSell} = await index.scaleAmount(
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
