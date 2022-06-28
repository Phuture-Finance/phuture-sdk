import { QuotePayload } from "../dist/src/interface";

jest.mock("axios");

const allPayloadExcept = (key?: keyof QuotePayload): QuotePayload => {
	type ObjectKey = keyof typeof payload;
	const payload: QuotePayload = {
		buyToken: "PDI",
		sellToken: "ETH",
		sellAmount: "123124",
		takerAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
	};

	if (key) {
		payload[key as ObjectKey] = "abc";
	}
	return payload;
};
//
// describe("Error boundaries", () => {
// 	it("error if the sell amount is invalid", async () => {
// 		// Setup
// 		const payload = allPayloadExcept("sellAmount");
// 		const errorMessage =
// 			"Amount provided could not be parsed into a big number";
// 		// Execute
// 		// Verify
// 		try {
// 			await new QuoteAggregator().quote(payload);
// 		} catch (e: any) {
// 			expect(e.message).toBe(errorMessage);
// 		}
// 	});
//
// 	it("should error if slippage is invalid", async () => {
// 		// Setup
// 		const payload = allPayloadExcept();
// 		const errorMessage = "Found a slippage value but was unable to parse it";
// 		// Execute
// 		// Verify
// 		try {
// 			await new QuoteAggregator().quote(payload, "bbcnews");
// 		} catch (e: any) {
// 			expect(e.message).toBe(errorMessage);
// 		}
// 	});
//
// 	it("should error if the gas fee is invalid", async () => {
// 		// Setup
// 		const payload = allPayloadExcept();
// 		const errorMessage = "Found a gas fee value but was unable to parse it";
// 		// Execute
// 		// Verify
// 		try {
// 			await new QuoteAggregator().quote(payload, "", "gasfees");
// 		} catch (e: any) {
// 			expect(e.message).toBe(errorMessage);
// 		}
// 	});
//
// 	it("should error if there is no buy token", async () => {
// 		// Setup
// 		const payload = allPayloadExcept("buyToken");
// 		payload.buyToken = "";
// 		const errorMessage = "A buy token is required";
// 		// Execute
// 		// Verify
// 		try {
// 			await new QuoteAggregator().quote(payload);
// 		} catch (e: any) {
// 			expect(e.message).toBe(errorMessage);
// 		}
// 	});
//
// 	it("should error if there is no sell token", async () => {
// 		// Setup
// 		const payload = allPayloadExcept("sellToken");
// 		payload.sellToken = "";
// 		const errorMessage = "A sell token is required";
// 		// Execute
// 		// Verify
// 		try {
// 			await new QuoteAggregator().quote(payload);
// 		} catch (e: any) {
// 			expect(e.message).toBe(errorMessage);
// 		}
// 	});
//
// 	it("should error if the taker address is not valid", async () => {
// 		// Setup
// 		const payload = allPayloadExcept("takerAddress");
// 		const errorMessage = "Address is invalid: abc";
// 		// Execute
// 		// Verify
// 		try {
// 			await new QuoteAggregator().quote(payload);
// 		} catch (e: any) {
// 			expect(e.message).toBe(errorMessage);
// 		}
// 	});
//
// 	it("should pass the boundary if all inputs are valid", async () => {
// 		// Setup
// 		const payload = allPayloadExcept();
//
// 		let error = false;
// 		new QuoteAggregator()
// 			.quote(payload)
// 			.catch(() => (error = true))
// 			.finally(() => expect(error).toBe(false));
// 	});
// });
//
// describe("Swap execution", () => {
// 	it("should call fetch with correct query params", async () => {
// 		const accept = {
// 			sellAmount: "100000000000000000000",
// 			buyAmount: "2663907000981641103",
// 			price: "0.002663907000981641",
// 			guaranteedPrice: "0.002637267930971825",
// 			to: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
// 			data: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
// 			value: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
// 			gas: "111000",
// 			gasPrice: "56000000000",
// 			buyTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
// 			sellTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
// 			allowanceTarget: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
// 		};
// 		const payload = allPayloadExcept();
// 		const expectedUrl =
// 			"https://api.0x.org/swap/v1/quote?buyToken=PDI&sellToken=ETH&sellAmount=123124&takerAddress=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
//  try { await new QuoteAggregator().quote(payload); } catch { expect(axios.get).toHaveBeenCalledWith(expectedUrl); }
// }); });
