const mongoose = require('mongoose')

const CountSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: 'Bird'
    },
    code: {
        type: String,
        ref: 'Bird'
    },
    count{
        type: Number,
    },
    watchSession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WatchSession'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bird: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bird'
    },
})

module.exports = mongoose.model('Bird', BirdSchema)
