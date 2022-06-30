const Router = require('express').Router()
const Hub = require('./sessions.hub')

Router.get('/sessions/:token', Hub.verifySession)

module.exports = Router