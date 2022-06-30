require('dotenv').config()

module.exports = {

    mongodbHost: process.env.MONGODB_HOST,
    enviroment: process.env.ENVIROMENT,
    appHost: process.env.APP_HOST,
    host: process.env.HOST,
    port: process.env.PORT,
    brand: process.env.BRAND,
    cron: process.env.CRON === 'true',
    salt: process.env.SALT,

    sendgrid: {
        key: process.env.SENDGRID_KEY,
        emailMain: process.env.SENDGRID_EMAIL_MAIN
    }
}