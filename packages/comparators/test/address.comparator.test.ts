import {expect} from 'chai';
import {addressComparator} from '../src';

/** @test {addressComparator} */
test('addressComparator', () => {
	expect(
		addressComparator(
			'0x0000000000000000000000000000000000000000',
			'0x0000000000000000000000000000000000000001',
		),
	).to.equal(-1);

	expect(
		addressComparator(
			'0x0000000000000000000000000000000000000001',
			'0x0000000000000000000000000000000000000000',
		),
	).to.equal(1);

	// T.throws(() => addressComparator('test', '0x0000000000000000000000000000000000000000'),
	//     {
	//         instanceOf: TypeError,
	//         message: "Invalid address: test"
	//     });
	//
	// t.throws(() => addressComparator('0x0000000000000000000000000000000000000000', '0123'),
	//     {
	//         instanceOf: TypeError,
	//         message: "Invalid address: 0123"
	//     });

	expect(() =>
		addressComparator(
			'0x0000000000000000000000000000000000000000',
			'0x0000000000000000000000000000000000000000',
		),
	).to.throw(Error, 'Comparator duplicate');
});
