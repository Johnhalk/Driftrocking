var Users = require('./userData'),
    Purchases = require('./purchaseData'),
    purchaseStub = require('../stub/purchaseStubData.json'),
    userStub = require('../stub/userStubData.json'),
    _ = require('lodash');
let users = new Users
let purchases = new Purchases

class Data {
    constructor() {
        this.userData
        this.purchaseData
    }

    //Get Data from API sources for both users and purchases
    async getData() {
        await users.getAllUsers()
        this.userData = users.responseData

        await purchases.getAllPurchases()
        this.purchaseData = purchases.responseData
    }
    // Get Most frequently occuring purchase in purchase data
    getMostSoldItem() {
        var output = _.mapValues(this.purchaseData, function (item) {
            return item.item
        })
        var result = _.chain(output).countBy().toPairs().value()
        let frequencyOfPurchase = 0
        let newFrequencyOfPurchase = 0
        let mostSoldItems = []
        let i
        for (i = 0; i < result.length; i++) {
            if (result[i][1] >= frequencyOfPurchase) {
                frequencyOfPurchase = result[i][1]
                mostSoldItems.push(result[i][0])
                if (newFrequencyOfPurchase != frequencyOfPurchase) {
                    newFrequencyOfPurchase = frequencyOfPurchase
                    mostSoldItems = []
                    mostSoldItems.push(result[i][0])
                }
            } else {

            }
        }
        return mostSoldItems
    }

    // Get the user id from users data
    getUserId(userEmail) {
        var userEmail = userEmail
        let i
        for (i = 0; i < this.userData.length; i++) {
            if (this.userData[i].email == userEmail) {
                var result = this.userData[i].id
            }
        }
        console.log(result)
        return result
    }
    // Get the total spend of a specific user id in purchase data
    getTotalSpendById(userEmail) {
        var userId = this.getUserId(userEmail)
        var purchaseSpendResult = []
        var totalSpendOfUser = 0
        let i
        for (i = 0; i < this.purchaseData.length; i++) {
            if (this.purchaseData[i].user_id == userId) {
                purchaseSpendResult.push(this.purchaseData[i].spend)
            }
        }
        for (i=0; i< purchaseSpendResult.length; i++) {
            totalSpendOfUser += parseFloat(purchaseSpendResult[i])
            var total = totalSpendOfUser
        }
        console.log(totalSpendOfUser)
        return total
    }

    async getValueOfItem() {
        await this.getData()
        var output =
            _(this.purchaseData)
                .groupBy('id')
                .map((objs, userId) => ({
                    'id': key,
                    'spend': _.sumBy(objs, 'spend')
                }))
                .value();
        console.log(output)
        var maxSpendObject = Math.max(...output.map(e => parseFloat(e.spend)));
        var maxSpend = maxSpendObject.toString()
        var obj = output.find(outputs => outputs.spend === maxSpend);
        console.log(obj.item);
    }
}

module.exports = Data;