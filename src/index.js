var Purchases = require('../src/components/purchaseData'),
    Users = require('../src/components/userData'),
    Data = require('../src/components/dataCompare')


// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " SOME_PARAM");
//     process.exit(-1);
// }

var param = process.argv[2]
let data
module.exports = {
    testCall() {
        let purchases = new Purchases
        purchases.getAllPurchases()
    },
    testCallTwo() {
        let purchases = new Purchases
        purchases.getPurchaseDataFromApi()

    },
    testUserCall() {
        let users = new Users
        users.getAllUsers()
    },
    testUserCallTwo() {
        let users = new Users
        users.getUserDataFromApi()
    },
    testDataCall() {
        data = new Data
        data.getData()
    },
    async testPurchaseData() {
        data = new Data
       await data.getData()
        data.getMostSoldItem()
    }
}
// node index.js testCall purchases 100 1
// ARGV to allow command line interactions
// make-runnable to execute on command line

require('make-runnable');