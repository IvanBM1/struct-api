const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.sessionId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'sessionId',
            value: this.props.sessionId,
        })

        this.token = new Validator({
            type: 'string',
            name: 'token',
            prop: 'token',
            value: this.props.token,
            size: 64
        })
    }
}