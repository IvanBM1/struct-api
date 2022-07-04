const Router = require('express').Router()
const Hub = require('./bills.hub')
const Middlewares = require('../middlewares')

Router.post('/bills', Middlewares.auth, Hub.createBill)

Router.get('/bills/:billId', Middlewares.auth, Hub.getBill)

Router.get('/bills', Middlewares.auth, Hub.getBills)

Router.put('/bills/:billId', Middlewares.auth, Hub.updateBill)

Router.delete('/bills/:billId', Middlewares.auth, Hub.deleteBill)

module.exports = Router