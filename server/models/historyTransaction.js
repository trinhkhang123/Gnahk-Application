const { int } = require('hardhat/internal/core/params/argumentTypes');
const mongoose = require('mongoose');
const {Schema} = mongoose

const historyTransactionSchema = new Schema({
    address: String,
    typeTransaction: String,
    status : String,
    time:String
})

const historyTransactionModel = mongoose.model('HistoryTransaction',historyTransactionSchema);


module.exports = historyTransactionModel;