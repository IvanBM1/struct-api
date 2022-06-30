const Model = require('./users.model')
const Messages = require('./users.messages')
const Services = require('../services')
const Methods = require('../methods')
const Utils = require('../utils')

module.exports = {
    loginUser,
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    Model,
    Messages
}

async function loginUser(data) {
    try {

        const user = await Model.findOne({email: data.email}, '+password')

        if(!user)
            throw new Messages(data).userNotFound

        if(!Methods.bcryptCompare(data.password, user.password))
            throw new Messages(data).userPasswordError

        return await Services.Sessions.createSession({userId: user._id})

    } catch(error) {
        throw error
    }
}

async function createUser(data) {
    try {

        const user = new Model(data)

        return await user.save()

    } catch(error) {
        throw error
    }
}

async function getUsers(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = []
        }

        const users = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            users,
            metadata: Utils.metadata(page, limit, total, users.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getUser(userId) {
    try {

        const user = await Model.findOne({_id: userId})

        if(!user)
            throw new Messages(userId).userNotFound

        return user

    } catch(error) {
        throw error
    }
}

async function updateUser(userId, data) {
    try {

        const user = await getUser(userId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            user[key] = data[key]
        })

        return await user.save()

    } catch(error) {
        throw error
    }
}

async function deleteUser(userId) {
    try {

        await getUser(userId)
        await Model.deleteOne({_id: userId})

        return userId

    } catch(error) {
        throw error
    }
}