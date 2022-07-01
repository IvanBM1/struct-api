const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./users.messages')
const Methods = require('../methods')

const schema = new Schema({

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    name: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String,
        select: false
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
    
    this.name = `${ this.firstName } ${ this.lastName }`
    this.updated = new Date()

    if(this.password)
        this.password = Methods.bcryptHash(this.password)

    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).UserSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).UserDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).UserGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).UserGetError)
    next()
})

module.exports = Model('Users', schema)