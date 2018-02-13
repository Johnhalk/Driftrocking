var Users = require('../userData/userData'),
    Purchases = require('../purchaseData/purchaseData'),
    purchaseStub = require('../../stub/purchaseStubData.json'),
    userStub = require('../../stub/userStubData.json'),
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
        for (i = 0; i < purchaseSpendResult.length; i++) {
            totalSpendOfUser += parseFloat(purchaseSpendResult[i])
            var total = totalSpendOfUser
        }
        return total
    }

    // Gets users emails based on their unique IDs
    getUserEmail(dataSet) {
        var dataSet = dataSet
        let i
        let x = 0
        var result = []
        for (i = 0; i < this.userData.length; i++) {
            if (this.userData[i].id == dataSet[x]) {
                result.push(this.userData[i].email)
                x++
                i = 0
            }
        }
        return result
    }

    //Finds most loyal users based on frequency of purchase and returns their email based on their unique IDs
    getMostLoyalUser() {
        var output = _.mapValues(this.purchaseData, function (item) {
            return item.user_id
        })
        var result = _.chain(output).countBy().toPairs().value()
        let numberOfPurchases = 0
        let newnumberOfPurchases = 0
        let arrayOfLoyalUsers = []
        let i
        for (i = 0; i < result.length; i++) {
            if (result[i][1] >= numberOfPurchases) {
                numberOfPurchases = result[i][1]
                arrayOfLoyalUsers.push(result[i][0])
                if (newnumberOfPurchases != numberOfPurchases) {
                    newnumberOfPurchases = numberOfPurchases
                    arrayOfLoyalUsers = []
                    arrayOfLoyalUsers.push(result[i][0])
                }
            }
        }
         return this.getUserEmail(arrayOfLoyalUsers)
    }
}

module.exports = Data;