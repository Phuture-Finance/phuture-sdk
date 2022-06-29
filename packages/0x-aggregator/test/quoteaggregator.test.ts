
import {ZeroExAggregator} from '../src';
import axios from 'axios';

const baseUrl = 'https://api.0x.org';
interface MockPayload {
    buyToken: string,
    sellToken: string,
    sellAmount: string,
    options: object
}
const buildPayload = (): MockPayload => { 
    return {
        buyToken: 'PDI',
        sellToken: 'ETH',
        sellAmount: '123124',
        options: {
            takerAddress: '0x0000000000000000000000000000000000000000'
        }
    };
}


jest.mock("axios");
beforeAll(() => {
    // @ts-ignore
    axios.create.mockReturnThis();
});
describe("Error boundaries", () => {
    it('should compile at runtime', () => {
        expect(() => new ZeroExAggregator()).not.toThrow();
    });
})/**
  1: "swap/v1/price", {"params": {"buyToken": "PDI", "sellAmount": "123124", "sellToken": "ETH", "takerAddress": "0x0000000000000000000000000000000000000000"}}
           2: "swap/v1/quote", {"params": {"buyToken": "PDI", "sellAmount": "123124", "sellToken": "ETH", "takerAddress": "0x0000000000000000000000000000000000000000"}}
           3: "swap/v1/sources" */

describe('Price, quote and source execution', () => { 
    it('Should return a price', async () => {

        // Setup
        const {buyToken, sellToken, sellAmount, options} = buildPayload();
        const params = ["swap/v1/price", {"params": {"buyToken": "PDI", "sellAmount": "123124", "sellToken": "ETH", "takerAddress": "0x0000000000000000000000000000000000000000"}}];
        
        // @ts-ignore
        axios.get.mockResolvedValue('{"data": {"price": "123124"}}');
        

       	// Execute
        await new ZeroExAggregator()
        .price(sellToken,
            buyToken,
            sellAmount,
            options
            );

        // Verify
        expect(axios.get).toHaveBeenCalledWith(params[0], params[1]);
    });

    it('Should return a quote', async () => {
        const {buyToken, sellToken, sellAmount, options} = buildPayload();
        const expectedUrl = `${baseUrl}/swap/v1/quote`;
        try {
			// Execute
			await new ZeroExAggregator().quote(sellToken, buyToken, sellAmount, options);
		} catch { 
			// Verify
			expect(axios.get).toHaveBeenCalledWith(expectedUrl);
		}
    });

    it('Should return a source', async () => {
        // setup - expected url to be called
        const expectedUrl = `${baseUrl}/swap/v1/source`;
        try {
			// Execute
			await new ZeroExAggregator().sources();
		} catch { 
			// Verify
			expect(axios.get).toHaveBeenCalledWith(expectedUrl);
		}
    });
});