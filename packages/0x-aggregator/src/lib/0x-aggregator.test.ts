import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ZeroExAggregator, zeroExBaseUrl } from './0x-aggregator';

const payload = {
	buyToken: 'PDI',
	sellToken: 'ETH',
	sellAmount: '123124',
	options: {
		takerAddress: '0x0000000000000000000000000000000000000000',
	},
};

const mock = new MockAdapter(axios);

describe('Error boundaries', () => {
	it('should compile at runtime', () => {
		expect(() => ZeroExAggregator.fromUrl(zeroExBaseUrl['1'])).not.toThrow();
	});
});

describe('Price, quote and source execution', () => {
	it('Should return a price', async () => {
		// Setup
		const { buyToken, sellToken, sellAmount, options } = payload;

		mock.onGet('/swap/v1/price').reply(200, {
			buyAmount: '123124',
		});

		// Execute
		await ZeroExAggregator.fromUrl(zeroExBaseUrl['1'])[0].price(
			sellToken,
			buyToken,
			sellAmount,
			options
		);
	});

	it('Should return a quote', async () => {
		mock.onGet('/swap/v1/quote').reply(200, {
			buyAmount: '123124',
		});

		const { buyToken, sellToken, sellAmount, options } = payload;
		await ZeroExAggregator.fromUrl(zeroExBaseUrl['1'])[0].quote(
			sellToken,
			buyToken,
			sellAmount,
			options
		);
	});

	it('Should return a source', async () => {
		mock.onGet('/swap/v1/sources').reply(200, {
			records: [],
		});

		await ZeroExAggregator.fromUrl(zeroExBaseUrl['1'])[0].sources();
	});
});
