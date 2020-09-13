const mongoose = require('mongoose')

const WatchSessionSchema = new mongoose.Schema({
    tempature: {
        type: String
    },
    condition: {
        type: String
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    local: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    count: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Count'
    },
})

module.exports = mongoose.model('WatchSession', WatchSessionSchema)
