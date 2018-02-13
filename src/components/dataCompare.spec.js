var moxios = require('moxios'),
    expect = require('expect'),
    sinon = require('sinon'),
    Data = require('./dataCompare'),
    Users = require('./userData'),
    Purchases = require('./purchaseData'),
    usersStub = require('../stub/userStubData.json'),
    purchaseStub = require('../stub/purchaseStubData.json'),
    extraPurchaseStub = require('../stub/extraPurchaseStubData.json'),
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
            expect(data.getMostSoldItem(data.purchaseData)).toEqual(["Synergistic Paper Keyboard"])
        });

        it('should handle multiple purchases of the same frequency', () => {
            const extraPurchaseData = extraPurchaseStub.data
            data.purchaseData = extraPurchaseData
            expect(data.getMostSoldItem(data.purchaseData)).toEqual(["Lightweight Steel Card machine", "Lightweight Steel Car", "Heavy Duty Iron Table"])
        });

    });

    describe('getUserId', () => {
        it('should find a specific user id based on email input', () =>{
            data.userData = usersStub.data
            expect(data.getUserId('terry_henry@doyle.io')).toEqual("S27G-8UMJ-LDSL-UOPN")
        });
    });

    describe('getTotalSpendById', () => {
        it('should add up the total spend in purchase data based on their unique id', () => {
            data.userData = usersStub.data
            data.purchaseData = purchaseStub.data
            expect(data.getTotalSpendById('terry_henry@doyle.io')).toEqual(58.68)
        })
    })

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