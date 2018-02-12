var moxios = require('moxios'),
    expect = require('expect'),
    sinon = require('sinon'),
    Data = require('./dataCompare'),
    Users = require('./userData'),
    Purchases = require('./purchaseData'),
    usersStub = require('../stub/userStubData.json'),
    purchaseStub = require('../stub/purchaseStubData.json'),
    config = require('../config.json')

describe('Data', () => {
    let data

    beforeEach(() => {
        moxios.install()
        data = new Data
    });

    afterEach(() => {
        moxios.uninstall()
    });


    describe('getMostSoldItems', () => {
        it('should find the most frequent purchases', () => {
            data.purchaseData = purchaseStub.data
            expect(data.getMostSoldItem(data.purchaseData)).toEqual(["Lightweight Steel Car", "Heavy Duty Iron Table"])
        });
    });

    // describe('getData', () => {
    //     it('should get the users and purchases data', async () => {
    //         const userResults = usersStub
    //         const purchaseResults = purchaseStub
    //         let baseUrlPageOne = 'https://driftrock-dev-test.herokuapp.com/users?per_page=100&page=1'
    //         let baseUrlPageTwo = 'https://driftrock-dev-test.herokuapp.com/purchases?per_page=100&page=1'

    //         moxios.stubRequest(baseUrlPageOne, {
    //             status: 200,
    //             response: userResults
    //         });

    //         moxios.stubRequest(baseUrlPageTwo, {
    //             status: 200,
    //             response: purchaseResults
    //         });

    //         const onFulfilled = sinon.spy()
    //         await data.getData().then(onFulfilled)
    //         expect(data.userResults).toEqual(userStub.data)
    //         expect(data.purchaseResults).toEqual(purchaseStub.data)
    //     });
    // });

});