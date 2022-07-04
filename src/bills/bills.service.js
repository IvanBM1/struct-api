const Model = require('./bills.model')
const Messages = require('./bills.messages')
const Services = require('../services')
const Utils = require('../utils')

module.exports = {
    createBill,
    getBills,
    getBill,
    updateBill,
    deleteBill,
    Model,
    Messages
}

async function createBill(data) {
    try {

        const bill = new Model(data)

        return await bill.save()

    } catch(error) {
        throw error
    }
}

async function getBills(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = []
        }

        const bills = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            bills,
            metadata: Utils.metadata(page, limit, total, bills.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getBill(billId) {
    try {

        const bill = await Model.findOne({_id: billId})

        if(!bill)
            throw new Messages(billId).billNotFound

        return bill

    } catch(error) {
        throw error
    }
}

async function updateBill(billId, data) {
    try {

        const bill = await getBill(billId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            bill[key] = data[key]
        })

        return await bill.save()

    } catch(error) {
        throw error
    }
}

async function deleteBill(billId) {
    try {

        await getBill(billId)
        await Model.deleteOne({_id: billId})

        return billId

    } catch(error) {
        throw error
    }
}