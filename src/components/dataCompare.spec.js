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
        data.purchaseData = purchaseStub.data
        data.userData = usersStub.data
    });

    afterEach(() => {
        moxios.uninstall()
    });


    describe('getMostSoldItems', () => {
        it('should find the most frequent purchases', () => {
            expect(data.getMostSoldItem(data.purchaseData)).toEqual(["Synergistic Paper Keyboard"])
        });

        it('should handle multiple purchases of the same frequency', () => {
            const extraPurchaseData = extraPurchaseStub.data
            data.purchaseData = extraPurchaseData
            expect(data.getMostSoldItem(data.purchaseData)).toEqual(["Lightweight Steel Card machine", "Lightweight Steel Car", "Heavy Duty Iron Table"])
        });

    });

    describe('getUserId', () => {
        it('should find a specific user id based on email input', () => {
            expect(data.getUserId('terry_henry@doyle.io')).toEqual("S27G-8UMJ-LDSL-UOPN")
        });
    });

    describe('getTotalSpendById', () => {
        it('should add up the total spend in purchase data based on their unique id', () => {
            expect(data.getTotalSpendById('terry_henry@doyle.io')).toEqual(58.68)
        });
    });

    describe('getUserEmail', () => {
        it('should find a users email in user data based on what data set of IDs are passed into the function', () => {
            dataSet = ['S27G-8UMJ-LDSL-UOPN']
            expect(data.getUserEmail(dataSet)).toEqual(["terry_henry@doyle.io"])
        });

        it('can handle multiple IDs and assign them their correct emails', () => {
            dataSet = ['KZHR-1H35-2IH8-JXYN', 'S27G-8UMJ-LDSL-UOPN', 'HTNF-7RJY-YFCU-GUN2']
            expect(data.getUserEmail(dataSet)).toEqual(["schimmel_quincy@ernser.io", "terry_henry@doyle.io", "langosh.tierra@erdman.co"])
        });

        describe('getMostLoyalUser', () => {
            it('should return which customer is most loyal', () => {
                stubUserData = {
                    "data": [
                        {
                            "id": "20RP-MNN8-JPBA-FH77",
                            "first_name": "Neva",
                            "last_name": "Hoeger",
                            "phone": "274-661-8596 x80290",
                            "email": "hoeger_neva@dickinicolas.info"
                        },
                        {
                            "id": "20RP-MNN8-JPBA-FP-22",
                            "first_name": "Roger",
                            "last_name": "Federer",
                            "phone": "274-661-8596 x80290",
                            "email": "Roger@tennis.info"
                        }
                    ]
                }
                stubPurchaseData = {
                    "data": [
                        {
                            "user_id": "20RP-MNN8-JPBA-FP-22",
                            "item": "Tennis Balls",
                            "spend": "3.40"
                        },
                        {
                            "user_id": "20RP-MNN8-JPBA-FP-22",
                            "item": "Tennis Racket",
                            "spend": "3.40"
                        },
                        {
                            "user_id": "20RP-MNN8-JPBA-FH77",
                            "item": "Lightweight Steel Card machine",
                            "spend": "3.40"
                        },
                    ]
                }
                data.purchaseData = stubPurchaseData.data
                data.userData = stubUserData.data
                expect(data.getMostLoyalUser()).toEqual(["Roger@tennis.info"])
            })

            it('Should return the list of most users who are most loyal, meaning have the most purchases', () => {
                expect(data.getMostLoyalUser()).toEqual(["terry_henry@doyle.io", "keaton.bahringer@moriettedicki.net"])
            })
        })
    });

    // describe('getData', () => {
    //     it('should get the users and purchases data', async function() {
    //         const userResults = usersStub
    //         const userResultsTwo = {
    //             "data": []
    //         }
    //         const purchaseResults = purchaseStub
    //         const purchaseResultsTwo = {
    //             "data": []
    //         }
    //         let baseUrlPageOne = 'https://driftrock-dev-test.herokuapp.com/users?per_page=100&page=1'
    //         let baseUrlPageTwo = 'https://driftrock-dev-test.herokuapp.com/users?per_page=100&page=2'
    //         let baseUrlPageThree = 'https://driftrock-dev-test.herokuapp.com/purchases?per_page=100&page=1'
    //         let baseUrlPageFour = 'https://driftrock-dev-test.herokuapp.com/purchases?per_page=100&page=2'

    //         moxios.stubRequest(baseUrlPageOne, {
    //             status: 200,
    //             response: userResults
    //         });

    //         moxios.stubRequest(baseUrlPageTwo, {
    //             status: 200,
    //             response: userResultsTwo
    //         });

    //         moxios.stubRequest(baseUrlPageThree, {
    //             status: 200,
    //             response: purchaseResults
    //         });

    //         moxios.stubRequest(baseUrlPageFour, {
    //             status: 200,
    //             response: purchaseResultsTwo
    //         });

    //         const onFulfilled = sinon.spy()
    //         await data.getData().then(onFulfilled)
    //         expect(data.userData).toEqual(userResults.data)
    //         expect(data.purchaseData).toEqual(purchaseResults.data)
    //     });
    // });

});