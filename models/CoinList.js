const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const CoinList = new Schema({
    coinName:{type:String},
    costUSD: {type:Number},
    data: { 
        start:{type: String},
        end: {type: String}
    }
})

module.exports = mongoose.model('coins-list', CoinList)