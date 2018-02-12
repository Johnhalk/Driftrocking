var moxios = require('moxios'),
    expect = require('expect'),
    sinon = require('sinon'),
    Users = require('./userData'),
    usersStub = require('../stub/userStubData.json'),
    config = require('../config.json')

describe('Users', () => {
    let users

    beforeEach(() => {
        moxios.install()
        users = new Users
    });

    afterEach(() => {
        moxios.uninstall()
    });

    describe('getUserDataFromApi', () => {
        it('should call the Api and save the response data to an array', async () => {
            const expectedResults = usersStub
            moxios.wait(() => {
                const request = moxios
                    .requests
                    .mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedResults
                });
            });
            await users.getUserDataFromApi()
            expect(users.responseData).toEqual(expectedResults.data)
            expect(users.responseOnPage).toEqual(100)
        });
    });

    describe('getAllUsers', () => {
        it('should call the Api until it has hit the last page with data available', async () => {
            let baseUrlPageOne = 'https://driftrock-dev-test.herokuapp.com/users?per_page=100&page=1'
            let baseUrlPageTwo = 'https://driftrock-dev-test.herokuapp.com/users?per_page=100&page=2'
            const expectedResultsPageOne = usersStub
            const expectedResultsPageTwo = {
                "data": [
                    {
                        "id": "20RP-MNN8-JPBA-FH77",
                        "first_name": "Neva",
                        "last_name": "Hoeger",
                        "phone": "274-661-8596 x80290",
                        "email": "hoeger_neva@dickinicolas.info"
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
            await users.getAllUsers().then(onFulfilled)
            let resultsOfData = expectedResultsPageOne.data.concat(expectedResultsPageTwo.data)
            expect(users.responseData).toEqual(resultsOfData)
        });
    });

});
