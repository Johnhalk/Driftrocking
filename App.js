var Data = require('./src/components/dataCompare')

let parameter = process.argv[2]
let data

module.exports = {
    async most_sold() {
        data = new Data
        await data.getData()
        data.getMostSoldItem()
    },
    async total_spend(param) {
        data = new Data
        await data.getData()
        data.getTotalSpendById(param)
    },
    async most_loyal() {
        data = new Data
        await data.getData()
        data.getMostLoyalUser()
    }
}
require('make-runnable');