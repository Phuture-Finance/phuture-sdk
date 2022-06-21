import { ethers } from 'ethers';
import {Swap} from '../src';
import {Payload} from '../src/interface';

const allPayloadExcept = (key?: keyof Payload): Payload =>  {

    type ObjectKey = keyof typeof payload;
    const payload: Payload = {
        buyToken: 'PDI',
        sellToken: 'ETH',
        sellAmount: '123124',
        takerAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    };

    if(key) { 
        payload[key as ObjectKey] = 'abc';
    }
    return payload;
}

describe('Error boundaries', () => {
	it('error if the sell amount is invalid', async () => {
		// Setup
        const payload = allPayloadExcept('sellAmount');
        const errorMessage = 'Amount provided could not be parsed into a big number';
        // Execute
		// Verify
        try {
           await new Swap().swap(payload);
        } catch(e:any) {
            expect(e.message).toBe(errorMessage);
        }        
	});

	it('should error if slippage is invalid', async () => {
		// Setup
		const payload = allPayloadExcept();
		const errorMessage = 'Found a slippage value but was unable to parse it';
		// Execute
		// Verify
		try {
			await new Swap().swap(payload, 'bbcnews');
		} catch(e:any) {
			expect(e.message).toBe(errorMessage);
		}        
	});

	it('should error if the gas fee is invalid', async () => {
		// Setup
		const payload = allPayloadExcept();
		const errorMessage = 'Found a gas fee value but was unable to parse it';
		// Execute
		// Verify
		try {
			await new Swap().swap(payload, '', 'gasfees');
		} catch(e:any) {
			expect(e.message).toBe(errorMessage);
		}        
	});

	it('should error if there is no buy token', async () => {
		// Setup
		const payload = allPayloadExcept('buyToken');
		payload.buyToken = '';
		const errorMessage = 'A buy token is required'
		// Execute
		// Verify
		try {
			await new Swap().swap(payload);
		} catch(e:any) {
			expect(e.message).toBe(errorMessage);
		}        
	});

	it('should error if there is no sell token', async () => {
		// Setup
		const payload = allPayloadExcept('sellToken');
		payload.sellToken = '';
		const errorMessage = 'A sell token is required';
		// Execute
		// Verify
		try {
			await new Swap().swap(payload);
		} catch(e:any) {
			expect(e.message).toBe(errorMessage);
		}
	});

	it('should error if the taker address is not valid', async () => {
		// Setup
		const payload = allPayloadExcept('takerAddress');
		const errorMessage = 'Address is invalid: abc';
		// Execute
		// Verify
		try {
			await new Swap().swap(payload);
		} catch(e:any) {
			expect(e.message).toBe(errorMessage);
		}
	});

	it('should pass the boundary if all inputs are valid', async () => {
		// Setup
		const payload = allPayloadExcept();

		let error = false;
		new Swap().swap(payload)
		.catch(() => error = true)
		.finally(() => expect(error).toBe(false));
	});
});

describe('Swap execution', () => {
	it('should normalise the payload to ready for query', () => {
		// Setup
		const payload = allPayloadExcept();
		const slippage = "01";
		
		const expectedQuery = `{"buyToken":"PDI","sellToken":"ETH","sellAmount":"123124","takerAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","slippagePercentage":"1"}`;

		// Execute
		const query = new Swap().modifyPayloadForQuery(payload, slippage);

		// Verify
		expect(JSON.stringify(query)).toBe(expectedQuery);
	});

	it('should successfully execute the swap', () => {
		// Setup
		const payload = allPayloadExcept();
		const gasFee = "123";
		const expectedQuery = `{"buyToken":"PDI","sellToken":"ETH","sellAmount":"123124","takerAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","gasFee":"123"}`;

		// Execute
		const query = new Swap().modifyPayloadForQuery(payload, '', gasFee);

		// Verify
		expect(JSON.stringify(query)).toBe(expectedQuery);
	});

	it('should call fetch with correct query params', async () => { 
		// Setup
		const accept = {
			"sellAmount": "100000000000000000000",
			"buyAmount": "2663907000981641103",
			"price": "0.002663907000981641",
			"guaranteedPrice": "0.002637267930971825",
			"to": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
			"data": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
			"value": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
			"gas": "111000",
			"gasPrice": "56000000000",
			"buyTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
			"sellTokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
			"allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
		}
		const mockFetchPromise = Promise.resolve({ json: () => Promise.resolve(accept) });
		global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

		const mockFetch = jest.spyOn(global, "fetch")
			//.mockImplementation(mockFn as jest.Mock);
		const payload = allPayloadExcept();
		const expectedUrl = "https://api.0x.org/swap/v1/quote?buyToken=PDI&sellToken=ETH&sellAmount=123124&takerAddress=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
		try {
			// Execute
			await new Swap().swap(payload);
		} catch { 
			// Verify
			expect(mockFetch).toHaveBeenCalledWith(expectedUrl);
		}
	});

	it('Should use a provider that I pass in', () => { 
		// setup
		const myProvider = ethers.providers.getDefaultProvider();

		// execute
		const swap = new Swap(myProvider);

		// verify
		expect(swap.provider).toBe(myProvider);
	})
});
