const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.userId = new Validator({
            type: 'objectId',
            name: 'identificador del usuario',
            prop: 'userId',
            value: this.props.userId,
        })
    
        this.firstName = new Validator({
            type: 'string',
            name: 'nombre',
            prop: 'firstName',
            value: this.props.firstName,
        })
    
        this.lastName = new Validator({
            type: 'string',
            name: 'apellido',
            prop: 'lastName',
            value: this.props.lastName,
        })
    
        this.phone = new Validator({
            type: 'digits',
            name: 'teléfono',
            prop: 'phone',
            value: this.props.phone,
            size: 10
        })
    
        this.email = new Validator({
            type: 'email',
            name: 'correo',
            prop: 'email',
            value: this.props.email,
        })
    
        this.password = new Validator({
            type: 'string',
            name: 'contraseña',
            prop: 'password',
            value: this.props.password,
        })
    }
}