const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.billId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'billId',
            value: this.props.billId,
        })

        this.type = new Validator({
            type: 'string',
            name: 'tipo',
            prop: 'type',
            value: this.props.type,
        })

        this.tag = new Validator({
            type: 'string',
            name: 'etiqueta',
            prop: 'tag',
            value: this.props.tag,
            required: false
        })

        this.amount = new Validator({
            type: 'float',
            name: 'monto',
            prop: 'amount',
            value: this.props.amount,
        })
    }
}