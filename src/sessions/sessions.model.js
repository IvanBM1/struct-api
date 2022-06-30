const Schema = require('mongoose').Schema
const ObjectId = require('mongoose').Types.ObjectId
const Model = require('mongoose').model
const Messages = require('./sessions.messages')

const schema = new Schema({

    userId: {
        type: ObjectId,
    },

    user: {
        type: ObjectId,
        ref: 'Users',
    },

    token: {
        type: String
    },

    expired: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {
    this.user = this.userId
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(Messages(err).sessionSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(Messages(err).sessionDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(Messages(err).sessionGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(Messages(err).sessionGetError)
    next()
})

module.exports = Model('Session', schema)