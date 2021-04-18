const express = require('express')
const router = express.Router()
const tradeController = require('../controllers/trade')

router.post('/buy', tradeController.buyStock)
router.post('/sell', tradeController.sellStock)

module.exports = router