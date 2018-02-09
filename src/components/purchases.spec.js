var axios = require('axios'),
    moxios = require('moxios'),
    expect = require('expect'),
    Purchases = require('./purchases'),
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
        it('Should call the Api and save the response data to an array', async () => {
            const expectedResults = {
                "data": [
                    {
                        "user_id": "KTR6-I42Y-6SZH-7YMZ",
                        "item": "Lightweight Steel Car",
                        "spend": "3.33"
                    }, {
                        "user_id": "KTR6-I42Y-6SZH-7YMZ",
                        "item": "Heavy Duty Iron Table",
                        "spend": "5.84"
                    }
                ]
            }
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
            expect(purchases.responseData).toEqual(
                [{ "item": "Lightweight Steel Car", "spend": "3.33", "user_id": "KTR6-I42Y-6SZH-7YMZ" },
                { "item": "Heavy Duty Iron Table", "spend": "5.84", "user_id": "KTR6-I42Y-6SZH-7YMZ" }])
            expect(purchases.responseOnPage).toEqual(2)
        });
    });
});