import {expect} from 'chai';
import {phutureGraphQL} from '../src';

const USER_ID = "0x000000000000000000000000000000000000dead";
/** @test {phutureGraphQL} */
test('fetch user indices',async () => { 
    //setup
    //execute
    const {users} = await phutureGraphQL().getUserIndices({id:USER_ID})
    const indices = users[0].indexes;

    //verify
    expect(indices).not.to.be.undefined
});

test('successfully fetch index History',async () => { 
    //setup
    //execute
    const {userIndexHistories} = await phutureGraphQL().getUserIndexHistories({id: USER_ID, dateLimit: "0"})
    const user = userIndexHistories[0].user;

    //verify
    expect(user.id).to.equal(USER_ID);

});

test('unsuccessfully fetch index History',async () => { 
    //setup
    //execute
    const {userIndexHistories} = await phutureGraphQL().getUserIndexHistories({id: USER_ID, dateLimit: "90000000000"})
    //verify
    expect(userIndexHistories.length).to.equal(0);
});

test('Daily capitalisations',async () => {

    //setup
    //execute
    const {dailyCapitalizations} = await phutureGraphQL().getCapitalizations({timestamp_gte: "0"})
    //verify
    expect(dailyCapitalizations.length).not.to.equal(0);
});
