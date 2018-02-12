var getFromAxios = require("../services/apiServices"),
    config = require('../config.json'),
    async = require('async')

let baseUrl = config.baseUrl
let perPageAmount = config.perPageAmount
let pageNumber = config.pageNumber

class Purchases {
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
            console.log("Current page number hit", pageNumber)
            console.log("Current number of data entries on current page", this.responseOnPage)
            pageNumber++
            await this.getUserDataFromApi()
        }
        return console.log("Number of purchase data entries", (this.responseData).length)
    }
};

module.exports = Purchases;