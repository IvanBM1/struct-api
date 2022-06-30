const Model = require('./sessions.model')
const Messages = require('./sessions.messages')
const Methods = require('../methods')

module.exports = {
    verifySession,
    createSession,
    getSessions,
    getSession,
    deleteSession,
    Model,
    Messages,
}

async function verifySession(token) {
    try {

        const session = await Model.findOne({token})    
            .populate('user')

        if(!session)
            throw new Messages().sessionNotFound

        if(session.expired < new Date())
            throw new Messages().sessionExpired

        return session

    } catch(error) {
        throw error
    }
}

async function createSession(data) {
    try {

        const session = new Model(data)

        session.token = Methods.cryptoHash(64)
        session.expired = Methods.tokenExpired()

        await session.save()

        return await getSession(session._id)

    } catch(error) {
        throw error
    }
}

async function getSessions(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = []
        }

        if(query.userId)
            options.userId = query.userId

        const sessions = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})
            .populate('user')

        const total = await Model.countDocuments(options)

        return {
            sessions,
            metadata: Methods.metadata(page, limit, total, sessions.length),
            query
        }

    } catch(error) {
        throw error
    }
}

async function getSession(sessionId) {
    try {

        const session = await Model.findOne({_id: sessionId})
            .populate('user')

        if(!session)
            throw new Messages(sessionId).sessionNotFound

        return session

    } catch(error) {
        throw error
    }
}

async function deleteSession(sessionId) {
    try {

        await getSession(sessionId)
        await Model.deleteOne({_id: sessionId})

        return sessionId

    } catch(error) {
        throw error
    }
}