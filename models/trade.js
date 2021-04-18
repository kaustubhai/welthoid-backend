const mongoose = require('mongoose')
const tradeSchema = new mongoose.Schema({
    stockName: {
        type: 'String',
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 10000
    },
    buyPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const trade = mongoose.Model('Trade', tradeSchema)
module.exports = trade