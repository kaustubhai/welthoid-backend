const mongoose = require('mongoose')

const connectDB = (dbName) => {
    mongoose.connect(`mongodb://localhost/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, () => {
            console.log('Database is up')
    })
}

module.exports = connectDB