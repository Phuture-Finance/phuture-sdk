import {expect} from 'chai';
import {phutureGraphQl, lmGraphQl} from '../src';

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
	const {dailyCapitalizations} = await phutureGraphQl().getCapitalizations({
		timestamp_gte: '9000000000000000000000000000000',
	});
	// Verify
	expect(dailyCapitalizations.length).to.equal(0);
});

test('fetch portfolio data', async () => { 
	// Setup
	// execute
	const {users} = await phutureGraphQl().getPortfolioData({ id: userId });
    
	// Verify
	expect(users[0].indexes.length).not.to.equal(0);
})

test('chart data', async () => { 
	// Setup
    const variables = { 
        id: "0xf9ccb834adbe4591fd517aa69a24bf97d1386092",
        dateEnd:1653004800,
        dateNow: 1652745600
    }
	// execute
	const {index} = await phutureGraphQl().getChartData(variables);
    
	// Verify
	expect(index).not.to.be.undefined;
})

test('fetch daily cap', async () => { 
	// Setup
	// execute
	const {dailyCapitalizations} = await phutureGraphQl().getDailyCap({ date: 0 });
    
	// Verify
	expect(dailyCapitalizations.length).not.to.equal(0);
})

test('fetch index info', async () => { 
	// Setup
    const id = "0xf9ccb834adbe4591fd517aa69a24bf97d1386092";
	// execute
	const {index} = await phutureGraphQl().getIndexInfo({id});
    
	// Verify
	expect(index).not.to.be.undefined;
    expect(index?.id).to.equal(id)
})

test('get reserves', async () => { 

    // Setup
	// execute
	const {reserves} = await lmGraphQl().getReserves();
    
	// Verify
	expect(reserves).not.to.be.empty
})

test('get ranges by address', async () => { 

    // Setup
    const address = "0x0815c1e34a819f48d480a173db83b58c076d7299";
	// execute
	const {vestingRanges} = await lmGraphQl().getRangesByAddress({address});
    
	// Verify
	expect(vestingRanges).not.to.be.empty;
    expect(vestingRanges[0]?.account).to.equal(address)
})

test('get stats', async () => { 
	// Setup
    const id = "0xd0ff91311967d8279fdcd0d3fa8c49e07b5f2380"
	// execute
	const {stat} = await phutureGraphQl().getStats({id});
    
	// Verify
	expect(stat).not.to.be.undefined;
    expect(stat?.id).to.equal(id)
})

test('get index', async () => { 
	// Setup
    const id = "0xf9ccb834adbe4591fd517aa69a24bf97d1386092"
	// execute
	const {indexes} = await phutureGraphQl().getIndex({id});
    
	// Verify
	expect(indexes).not.to.be.empty;
})

test('get user indices details', async () => { 
	// Setup
    const id = "0x000000000000000000000000000000000000dead"
	// execute
	const {users} = await phutureGraphQl().getUserIndicesDetailed({id});
    
	// Verify
	expect(users).not.to.be.empty;
})

test('get user indices details', async () => { 
	// Setup
    const id = "0xf9ccb834adbe4591fd517aa69a24bf97d1386092"
	// execute
	const {indexes} = await phutureGraphQl().getIndexDetailed({id});
    
	// Verify
	expect(indexes).not.to.be.empty;
})

test('get user indices details', async () => { 
	
	// execute
	const {indexes} = await phutureGraphQl().getAllIndices();
    
	// Verify
	expect(indexes).not.to.be.empty;
})


test('get indices page', async () => { 
	// Setup
    const first = 1000;
	const skip = 0;

	// execute
	const {indexes} = await phutureGraphQl().getIndicesPage({first, skip})
    
	// Verify
	expect(indexes).not.to.be.empty;
})
