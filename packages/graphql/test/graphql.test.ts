import {expect} from 'chai';
import {phutureGraphQl} from '../src';

const userId = '0x000000000000000000000000000000000000dead';
/** @test {phutureGraphQl} */
test('fetch user indices', async () => {
	// Setup
	// execute
	const {users} = await phutureGraphQl().getUserIndices({id: userId});
	const indices = users[0].indexes;

	// Verify
	expect(indices).not.to.be.undefined;
});

test('successfully fetch index History', async () => {
	// Setup
	// execute
	const {userIndexHistories} = await phutureGraphQl().getUserIndexHistories({
		id: userId,
		dateLimit: '0',
	});
	const user = userIndexHistories[0].user;

	// Verify
	expect(user.id).to.equal(userId);
});

test('unsuccessfully fetch index History', async () => {
	// Setup
	// execute
	const {userIndexHistories} = await phutureGraphQl().getUserIndexHistories({
		id: userId,
		dateLimit: '90000000000',
	});
	// Verify
	expect(userIndexHistories.length).to.equal(0);
});

test('successfully fetch daily capitalisations', async () => {
	// Setup
	// execute
	const {dailyCapitalizations} = await phutureGraphQl().getCapitalizations({
		timestamp_gte: '0',
	});
	// Verify
	expect(dailyCapitalizations.length).not.to.equal(0);
});

test('unsuccessfully fetch daily capitalisations', async () => {
	// Setup
	// execute
	const {dailyCapitalizations} = await phutureGraphQL().getCapitalizations({
		timestamp_gte: '9000000000000000000000000000000',
	});
	// Verify
	expect(dailyCapitalizations.length).to.equal(0);
});
