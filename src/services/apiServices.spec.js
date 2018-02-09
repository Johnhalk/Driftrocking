var axios = require('axios'),
    moxios = require('moxios'),
    sinon = require('sinon'),
    expect = require('expect'),
    getFromAxios = require("./apiServices");

let baseUrl = 'https://driftrock-dev-test.herokuapp.com/purchases?per_page=1&page=1'

describe('getFromAxios', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('gets a response from api call', (done) => {
        const id = 1
        const expectedResults = {
            "data": [
                {
                    "user_id": "KTR6-I42Y-6SZH-7YMZ",
                    "item": "Lightweight Steel Car",
                    "spend": "3.33"
                }
            ]
        }

        moxios.stubRequest(baseUrl, {
            status: 200,
            response: expectedResults
        })

        const onFulfilled = sinon.spy()
        axios.get(baseUrl).then(onFulfilled)

        moxios.wait(() => {
            expect(onFulfilled.getCall(0).args[0].data).toBe(expectedResults)
            done()
        })
    })
})