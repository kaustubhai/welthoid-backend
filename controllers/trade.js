const asyncHandler = require('express-async-handler')

const tradeController = {
    buyStock: asyncHandler(async (req, res) => {
        
    }),
    sellStock: ("/sell", (req, res) => {
        res.json("Post Method")
    })
}

module.exports = tradeController