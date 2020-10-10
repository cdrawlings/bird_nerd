const mongoose = require('mongoose')

const CountSchema = new mongoose.Schema({
    count: {
        type: Number,
    },
    watchSession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WatchSession'
    }
})


const BirdSchema = new mongoose.Schema({
    comName: {
        type: String,
    },
    speciesCode: {
        type: String,
        unique: true
    },
    firstSpotted: {
        type: Date,
        default: Date.now
    },
    lastSpotted: {
        type: Date,
        default: Date.now
},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    count: [CountSchema]
})

module.exports = mongoose.model('Bird', BirdSchema)
