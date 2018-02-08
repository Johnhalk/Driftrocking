var callAPI = require("../services/apiServices")
var config = require('../config.json')
var async = require('async')

let baseUrl = config.baseUrl

class Purchases {
    constructor() {
        this.responseOnPage = this.responseOnPage
        this.responseData = []
    }

    getPurchasesFromApi(searchQuery, perPageAmount, pageNumber) {
        const url = `${baseUrl}/${searchQuery}?per_page=${perPageAmount}&page=${pageNumber}`
        return (getFromAxios(url))
            .then(
            response => {
                this.responseData = this.responseData.concat(response.data.data)
                this.responseOnPage = (response.data.data).length
                return console.log(this.responseData);
            }
            )
            .catch(
            error => {
                throw new Error(`ERROR retrieving data `, error);
            }
            );
    };

    async getAllPurchases(searchQuery, perPageAmount, pageNumber) {
        await (this.getPurchasesFromApi(searchQuery, perPageAmount, pageNumber))
        while (this.responseOnPage == perPageAmount) {
            await this.getPurchasesFromApi(searchQuery, perPageAmount, pageNumber)
            pageNumber++
            console.log("Current page number hit", pageNumber)
            console.log("Current number of data entries on current page", this.responseOnPage)
        }
        return console.log("Number of purchase data entries",(this.responseData).length)
    }
};

module.exports = Purchases;