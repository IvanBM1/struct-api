const Router = require('express').Router()

Router.get('/', (request, response) => {
    response.status(200).send({
        succes: true,
        data: {
            autor: 'github@IvanBM1',
            email: 'contact@ivanbm.com',
            message: 'Struct API'
        }
    })
})

module.exports = [
    Router,
    require('./users/users.router'),
    require('./sessions/sessions.router'),
]