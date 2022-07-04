const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./bills.messages')

const schema = new Schema({

    userId: {
        type: ObjectId
    },

    user: {
        type: ObjectId,
        ref: 'Users'
    },

    type: {
        type: String
    },

    tag: {
        type: String
    },

    amount: {
        type: Number
    },

    updated: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {
    this.user = this.userId
    this.updated = new Date()
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).billSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).billDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).billGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).billGetError)
    next()
})

module.exports = Model('Bills', schema)