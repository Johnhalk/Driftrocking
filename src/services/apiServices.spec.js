var axios = require('axios'),
    moxios = require('moxios'),
    sinon = require('sinon'),
    expect = require('expect'),
    purchaseStub = require('../stub/purchaseStubData.json'),
    getFromAxios = require("./apiServices");

let baseUrl = 'https://driftrock-dev-test.herokuapp.com/purchases?per_page=100&page=10'

describe('getFromAxios', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('gets a response from api call', (done) => {
        const expectedResults = purchaseStub

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