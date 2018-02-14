var Data = require('./src/components/dataCompare/dataCompare')

let parameter = process.argv[2]
let data

module.exports = {
    async most_sold() {
        data = new Data
        await data.getData()
        return data.getMostSoldItem()
    },
    async total_spend(parameter) {
        data = new Data
        await data.getData()
        return data.getTotalSpendById(parameter)
    },
    async most_loyal() {
        data = new Data
        await data.getData()
        return data.getMostLoyalUser()
    }
}
require('make-runnable');