const Purchases = require('../src/components/purchases')

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " SOME_PARAM");
    process.exit(-1);
}

var param = process.argv[2]
var param2 = process.argv[3]
var param3 = process.argv[4]

module.exports = {
    testCall(param, param2, param3) {
        let purchases = new Purchases
        purchases.getAllPurchases(param, param2, param3)
    },
    testCallTwo(param, param2, param3) {
        let purchases = new Purchases
        purchases.getPurchasesFromApi(param, param2, param3)

    }
}
// node index.js testCall purchases 100 1
// ARGV to allow command line interactions
// make-runnable to execute on command line

require('make-runnable');