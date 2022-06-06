import {expect} from 'chai';
import {merge} from '../src/merge';

test('merge should throw if target is not an object', () => {
	expect(() => merge(null, {})).to.throw('Target must be an object');
});

test('merge should throw if source is not an object', () => {
	expect(() => merge({}, null)).to.throw('Source must be an object');
});
