const Mongoose = require('mongoose')
const Services = require('./services')
const Config = require('./config')

module.exports = new Promise((resolve, reject) => {

    console.info(`[MONGODB] (INIT) ${ Config.mongodbHost }`.yellow)

    Mongoose.connect(Config.mongodbHost)
        .then(async () => {
            
            console.info(`[MONGODB] (SUCCESS) ${ Config.mongodbHost }`.magenta)

            const user = await Services.Users.Model.findOne({role: 'admin'})

            if(!user) {
                await Services.Users.createUser({
                    role: 'admin',
                    firstName: 'Admin',
                    lastName: 'Root',
                    email: `admin@${ Config.brand }.com`,
                    password: 'root'
                })
            }

            resolve()
        })
        .catch(error => {
            console.info(`[MONGODB] (ERROR) ${ Config.mongodbHost }`.red)
            console.info(error)
            reject()
        })
})