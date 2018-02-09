var axios = require('axios'),
    moxios = require('moxios'),
    expect = require('expect'),
    sinon = require('sinon'),
    Purchases = require('./purchases'),
    purchaseStub = require('../stub/purchaseStubData.json'),
    config = require('../config.json')

describe('Purchases', () => {
    let purchases
    let baseUrl = config.baseUrl
    let perPageAmount = config.perPageAmount
    let pageNumber = config.pageNumber

    beforeEach(() => {
        moxios.install()
        purchases = new Purchases
    })

    afterEach(() => {
        moxios.uninstall()
    })
    describe('getPurchasesFromApi', () => {
        it('should call the Api and save the response data to an array', async () => {
            const expectedResults = purchaseStub

            moxios.wait(() => {
                const request = moxios
                    .requests
                    .mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedResults
                });
            });
            await purchases.getPurchasesFromApi("purchases")
            expect(purchases.responseData).toEqual(expectedResults.data)
            expect(purchases.responseOnPage).toEqual(100)
        });
    });

    describe('getAllPurchases', () => {
        it('should call the Api until it has hit the last page with data available', async () => {
            let baseUrlPageOne = 'https://driftrock-dev-test.herokuapp.com/purchases?per_page=100&page=1'
            let baseUrlPageTwo = 'https://driftrock-dev-test.herokuapp.com/purchases?per_page=100&page=2'
            const expectedResultsPageOne = purchaseStub
            const expectedResultsPageTwo = {
                "data": [
                    {
                        "user_id": "KTR6-I42Y-6SZH-7YMZ",
                        "item": "Lightweight Steel Card machine",
                        "spend": "3.40"
                    }
                ]
            }

            moxios.stubRequest(baseUrlPageOne, {
                status: 200,
                response: expectedResultsPageOne
            });

            moxios.stubRequest(baseUrlPageTwo, {
                status: 200,
                response: expectedResultsPageTwo
            });
            const onFulfilled = sinon.spy()
            await purchases.getAllPurchases("purchases").then(onFulfilled)
                let resultsOfData = expectedResultsPageOne.data.concat(expectedResultsPageTwo.data)
                expect(purchases.responseData).toEqual(resultsOfData)
        })
    });

});
