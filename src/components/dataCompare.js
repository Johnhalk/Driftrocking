var Users = require('./userData'),
    Purchases = require('./purchaseData'),
    purchaseStub = require('../stub/purchaseStubData.json'),
    _ = require('lodash');
let users = new Users
let purchases = new Purchases

class Data {
    constructor() {
        this.userData
        this.purchaseData
    }

    async getData() {
        await users.getAllUsers()
        this.userData = users.responseData

        await purchases.getAllPurchases()
        this.purchaseData = purchases.responseData
    }

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
        console.log("most sold items are: ", mostSoldItems)
        console.log("Amount of times sold is: ", maxValue)
        return mostSoldItems
    }

    async getValueOfItem() {
        await this.getData()
        var output =
            _(this.purchaseData)
                .groupBy('item')
                .map((objs, key) => ({
                    'item': key,
                    'spend': _.sumBy(objs, 'spend')
                }))
                .value();
        var maxSpendObject = Math.max(...output.map(e => parseFloat(e.spend)));
        var maxSpend = maxSpendObject.toString()
        var obj = output.find(outputs => outputs.spend === maxSpend);
        console.log(obj.item);
    }
}

module.exports = Data;