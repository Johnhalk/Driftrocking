var Purchases = require('../src/components/purchaseData')

if (process.argv.length < 2) {
    console.log("Usage: " + __filename + " SOME_PARAM");
    process.exit(-1);
}

var param = process.argv[2]

module.exports = {
    testCall(param) {
        let purchases = new Purchases
        purchases.getAllPurchases(param)
    },
    testCallTwo(param) {
        let purchases = new Purchases
        purchases.getPurchasesFromApi(param)

    }
}
// node index.js testCall purchases 100 1
// ARGV to allow command line interactions
// make-runnable to execute on command line

require('make-runnable');