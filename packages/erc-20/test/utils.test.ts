import {toHex} from '../src/utils';
import {Token} from '../src/utils/token';

it('fails when hex length is not odd (hex.length % 2 !== 0)', () => {
	const testHex = toHex(1234);
	expect(testHex).toBe('0x04d2');
});
