const asyncHandler = require('express-async-handler')
const Trade = require('../models/trade')
const User = require('../models/user')

const tradeController = {
    buyStock: asyncHandler(async (req, res) => {
        const { stockName, quantity, buyPrice } = req.body
        const detail = {
            price: buyPrice,
            quantity
        }
        const user = await User.findOne({ googleId: req.user }).populate('currentTrades', 'stockName _id')
        let trade = user.currentTrades.filter((trade) => trade.stockName === stockName)
        if (trade.length === 0) {
            const newTrade = new Trade({ stockName, buy: detail, user: req.user })
            await newTrade.save()
            user.currentTrades = [...user.currentTrades, newTrade._id]
            res.json(newTrade)
        }
        else {
            const position = await Trade.findById(trade[0]._id)
            const samePriceTrade = position.buy.filter(t => t.price === buyPrice)
            if (samePriceTrade.length === 0)
                position.buy = [...position.buy, detail]
            else {
                position.buy.forEach(t => {
                    if (t.price === buyPrice) {
                        t.quantity = t.quantity + quantity
                    }
                })
            }
            await position.save()
            res.json(position)
        }
        user.coin = user.coin - (quantity * buyPrice)
        await user.save()
    }),
    // buyStock: asyncHandler(async (req, res) => {
    //     const { stockName, quantity, buyPrice } = req.body
    //     const trade = new Trade({ stockName, quantity, buyPrice, user: req.user })
    //     await trade.save()
    //     const transaction = quantity * buyPrice * -1
    //     const user = await User.findOne({ googleId: req.user })
    //     user.coin = user.coin + transaction
    //     console.log(transaction)
    //     user.currentTrades = [...user.currentTrades, trade._id]
    //     await user.save()
    //     res.json(trade)
    // }),
    // sellStock: asyncHandler(async (req, res) => {
    //     const { stockName, quantity, buyPrice, sellPrice } = req.body
    //     const user = await User.findOne({ googleId: req.user }).populate('currentTrades', 'stockName quantity')
    //     if (user.currentTrades.length === 0)
    //         return res.status(400).json({ msg: "No position of this stock currently" })
    //     const stockPosition = user.currentTrades.filter(trade => trade.stockName === stockName)
    //     if (stockPosition.length === 0)
    //         return res.status(400).json({ msg: "No position of this stock currently" })
    //     let quantityInPosition = 0
    //     stockPosition.forEach(trade => quantityInPosition + trade.quantity)
    //     if (quantity > quantityInPosition)
    //         return res.status(400).json({ msg: "Not enough position of this stock currently" })
    //     let transaction
    //     stockPosition.forEach(trade => {
    //         if (stockPosition > 0) {
    //             if (stockPosition === trade.quantity) {
    //                 transaction += trade.buyPrice * trade.quantity
    //             }
    //         }
    //     })
    //     // const trade = new Trade({ stockName, quantity, sellPrice, user: req.user })
    //     // await trade.save()
    //     // const transaction = quantity * sellPrice
    //     // const user = await User.find({ googleId: req.user })
    //     // user.coin = user.coin + transaction
    //     // user.currentTrades.filter(t => t._id === trade._id)
    //     // user.pastTrades = [...user.pastTrades, trade._id]
    //     // await user.save()
    //     res.json(user)
    // }),
    getTrade: asyncHandler(async (req, res) => {
        const { tradeId } = req.body
        const trade = await Trade.findById(tradeId)
        if (!trade)
            throw new Error("No Trade Found")
        res.json(trade)
    })
}

module.exports = tradeController