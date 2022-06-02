import test from 'ava';
import {addressComparator} from '../src'

test('addressComparator', (t) => {
    t.is(
        addressComparator(
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000001',
        ),
        -1,
    );
    t.is(
        addressComparator(
            '0x0000000000000000000000000000000000000001',
            '0x0000000000000000000000000000000000000000',
        ),
        1,
    );

    t.throws(() => addressComparator('test', '0x0000000000000000000000000000000000000000'),
        {
            instanceOf: TypeError,
            message: "Invalid address: test"
        });

    t.throws(() => addressComparator('0x0000000000000000000000000000000000000000', '0123'),
        {
            instanceOf: TypeError,
            message: "Invalid address: 0123"
        });

    t.throws(
        () =>
            addressComparator(
                '0x0000000000000000000000000000000000000000',
                '0x0000000000000000000000000000000000000000',
            ),
        {
            message:
                'Comparator duplicate: 0x0000000000000000000000000000000000000000 == 0x0000000000000000000000000000000000000000',
        },
    );
});
