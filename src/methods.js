const Moment = require('moment')
const XlsJson = require('xls-to-json')
const Xlsx = require('xlsx')
const Crypto = require('crypto')
const Cryptr = require('cryptr')
const Bcrypt = require('bcrypt')
const Config = require('./config')

module.exports = {
    tokenExpired,
    xlsjson,
    jsonxls,
    bcryptHash,
    bcryptCompare,
    stringCryptr,
    stringDecrypt,
    stringCompare,
    cryptoHash,
}

function tokenExpired() {
    return Moment().add(16, 'days').toDate()
}

function bcryptHash(value) {
    return Bcrypt.hashSync(value, 7)
}

function bcryptCompare(value, hash) {
    return Bcrypt.compareSync(value, hash)
}

function stringCryptr(value) {
    const cryptr = new Cryptr(Config.salt)
    return cryptr.encrypt(value)
}

function stringDecrypt(value) {
    const cryptr = new Cryptr(Config.salt)
    return cryptr.decrypt(value)
}

function stringCompare(value, hash) {
    value = stringCryptr(value)
    return value === hash
}

function cryptoHash(length = 16) {

    const hash = Crypto.createHash('sha256', Config.salt)
          hash.update(new Date().toISOString())

    return hash.digest('hex').slice(0, length).toUpperCase()
}

async function xlsjson(file, data = {}) {
    try {

        const config = {
            input: file.path,
            output: null,
            allowEmptyKey: false
        }

        if(data.sheet)
            config.sheet = data.sheet

        if(data.rowsToSkip)
            config.rowsToSkip = data.rowsToSkip

        const promise = new Promise((resolve, reject) => {
            XlsJson(config, (error, result) => {
                if(error)  return reject(error)
                resolve(result)
            })
        })

        return await promise

    } catch(error) {
        throw {
            code: 501,
            key: 'FileReadError',
            message: 'Error al leer el archivo',
            $details: error
        }
    }
}

function jsonxls(data) {
    try {

        const workBook = Xlsx.utils.book_new()
        const workSheet = Xlsx.utils.json_to_sheet(data)

        Xlsx.utils.book_append_sheet(workBook, workSheet, 'Hoja1')

        return {
            file: Xlsx.write(workBook, {bookType: 'xlsx', type: 'buffer'}),
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }

    } catch(error) {
        throw {
            code: 501,
            key: 'FileCreateError',
            message: 'Error al generar el archivo',
            $details: error
        }
    }
}