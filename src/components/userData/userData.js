var getFromAxios = require("../../services/apiServices"),
    config = require('../../config.json'),
    async = require('async')

let baseUrl = config.baseUrl
let perPageAmount = config.perPageAmount
let pageNumber = config.pageNumber

class Users {
    constructor() {
        this.responseOnPage = this.responseOnPage
        this.responseData = []
    }

    getUserDataFromApi() {
        const url = `${baseUrl}/users?per_page=${perPageAmount}&page=${pageNumber}`
        return (getFromAxios(url))
            .then(
            response => {
                this.responseData = this.responseData.concat(response.data.data)
                this.responseOnPage = (response.data.data).length
            }
            )
            .catch(
            error => {
                throw new Error(`ERROR retrieving data `, error);
            }
            );
    };

    async getAllUsers() {
        await (this.getUserDataFromApi())
        while (this.responseOnPage == perPageAmount) {
            pageNumber++
            await this.getUserDataFromApi()
        }
    }
};

module.exports = Users;