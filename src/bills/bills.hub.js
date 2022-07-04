const Fields = require('./bills.fields')
const Service = require('./bills.service')

module.exports = {
    createBill,
    getBills,
    getBill,
    updateBill,
    deleteBill
}

async function createBill(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            userId: request.userId,
            type: fields.type.get(),
            tag: fields.tag.get(),
            amount: fields.amount.get(),
        }

        response.$data(await Service.createBill(data))

    } catch(error) {
        response.$error(error)
    }
}

async function getBills(request, response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find
        }

        response.$data(await Service.getBills(query))

    } catch(error) {
        response.$error(error)
    }
}

async function getBill(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            billId: fields.billId.get()
        }

        response.$data(await Service.getBill(data.billId))

    } catch(error) {
        response.$error(error)
    }
}

async function updateBill(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            billId: fields.billId.get()
        }

        const props = [
            'type',
            'tag',
            'amount'
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = request.body[prop]))

        response.$data(await Service.updateBill(data.billId, data))

    } catch(error) {
        response.$error(error)
    }
}

async function deleteBill(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            billId: fields.billId.get()
        }

        response.$data(await Service.deleteBill(data.billId))

    } catch(error) {
        response.$error(error)
    }
}