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
            .then (
            response => {
                this.responseData = this.responseData.concat(response.data.data)
                this.responseOnPage = (response.data.data).length
                console.log("here",this.responseOnPage)
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
        console.log(this.responseOnPage)
        console.log(perPageAmount)
        this.getPurchasesFromApi(searchQuery, perPageAmount, pageNumber)

        while (this.responseOnPage == perPageAmount) {
            await this.getPurchasesFromApi(searchQuery, perPageAmount, pageNumber)
            pageNumber++
            console.log("hello", pageNumber)
            console.log(this.responseOnPage)
        }
        return console.log(this.responseOnPage)

    }
};

module.exports = Purchases;