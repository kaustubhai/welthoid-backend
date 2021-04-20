const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const userController = {
    register: asyncHandler(async (req, res) => {
        const user = await User.findOne({ googleId: req.user })
        if (!user) {
            const created = new User({ googleId: req.user })
            await created.save()
            res.json(created)
        }
        else
            res.json(user)            
    }),
}

module.exports = userController