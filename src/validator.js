const ObjectId = require('mongoose').Types.ObjectId
const Moment = require('moment')

module.exports = class Validation {

    constructor(options) {

        this.value = options.value

        this.prefix = options.prefix
        this.name = options.name
        this.prop = options.prop
        this.type = options.type

        this.min = options.min
        this.max = options.max
        this.size = options.size
        this.enum = options.enum

        this.required = options.required != undefined? options.required : true
    }

    isEnum() {

        if(this.enum === undefined)
            return

        if(!this.enum.includes(this.value))
            throw this.error('no es una opción valida')

    }

    isSize() {

        if(this.size === undefined)
            return

        switch(this.type) {

            case 'string':

                if(this.value.length != this.size)
                    throw this.error(`debe tener ${ this.size } caracteres`)

                break

            case 'digits':

                if(this.value.length != this.size)
                    throw this.error(`debe tener ${ this.size } dígitos`)

                break

            case 'array':

                if(this.value.length != this.size)
                    throw this.error(`debe contener ${ this.size } elementos`)

                break
        }
    }

    isMax() {

        if(this.max === undefined)
            return

        switch(this.type) {

            case 'string':

                if(this.value.length > this.max)
                    throw this.error(`debe contaner máximo ${ this.max } caracteres`)

                break

            case 'digits':

                if(this.value.length > this.max)
                    throw this.error(`debe contaner máximo ${ this.max } dígitos`)

                break

            case 'integer':
            case 'float':

                if(this.value > this.max)
                    throw this.error(`el valor debe ser menor o igual a ${ this.max }`)

                break

            case 'array':

                if(this.value.length > this.max)
                    throw this.error(`debe contener máximo ${ this.max } elementos`)

                break

            case 'date':

                if(this.value > this.max)
                    throw this.error(`la fecha debe ser menor o igual a ${ Moment(this.max).format('DD/MM/YYYY hh:mm a') }`)

                break
        }
    }

    isMin() {

        if(this.min === undefined)
            return

        switch(this.type) {

            case 'string':

                if(this.value.length < this.min)
                    throw this.error(`debe contener mínimo ${ this.min } caracteres`)

                break

            case 'digits':

                if(this.value.length < this.min)
                    throw this.error(`debe contener mínimo ${ this.min } dígitos`)

                break

            case 'integer':
            case 'float':

                if(this.value < this.min)
                    throw this.error(`el valor debe ser mayor o igual a ${ this.min }`)

                break

            case 'array':

                if(this.value.length < this.min)
                    throw this.error(`debe contener mínimo ${ this.min } elementos`)

                break

            case 'date':

                if(this.value < this.min)
                    throw this.error(`la fecha debe ser mayor o igual a ${ Moment(this.min).format('DD/MM/YYYY hh:mm a') }`)

                break
        }
    }

    isType() {

        switch(this.type) {

            case 'string':

                this.value = `${ this.value || '' }`
                break

            case 'digits':

                const digits = /^[0-9]*$/g

                if(!digits.test(this.value))
                    throw this.error('se esperan dígitos')

                this.value = `${ this.value || '' }`
                break

            case 'integer':

                if(isNaN(this.value) || this.value % 1 != 0)
                    throw this.error('se espera un número entero')

                this.value = parseInt(this.value)
                break

            case 'float':

                if(isNaN(this.value))
                    throw this.error('se espera un número con punto decimal')

                this.value = parseFloat(this.value)
                break

            case 'boolean':

                if(typeof this.value != 'boolean')
                    throw this.error('se espera un valor booleano')

                this.value = Boolean(this.value)
                break

            case 'objectId':

                if(!ObjectId.isValid(this.value) || ObjectId(this.value) != this.value)
                    throw this.error('se espera un identificador')

                this.value = ObjectId(this.value)
                break

            case 'object':

                if(typeof this.value != 'object' || this.value instanceof Array || this.value === null)
                    throw this.error('se espera un objeto')

                this.value = new Object(this.value)
                break

            case 'array':

                if(!(this.value instanceof Array))
                    throw this.error('se espera un arreglo')

                break

            case 'date':

                if(!Moment.isDate(new Date(value)))
                    throw this.error('se espera una fecha')

                this.value = new Date(value)
                break

            case 'file':

                if(!(this.value instanceof File))
                    throw this.error('se espera un archivo')

                break

            case 'email':

                let email = /^[a-za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-za-z0-9](?:[a-za-z0-9-]*[a-za-z0-9])?\.)+[a-za-z0-9](?:[a-za-z0-9-]*[a-za-z0-9])?$/

                if(!email.test(this.value))
                    throw this.error('se espera un correo')

                break

            default: throw this.error('no es un tipo de dato valido')
        }
    }

    get() {

        if(this.required === true && (this.value === undefined || this.value === null || this.value === ''))
            throw this.error('es un valor requerido')

        if(this.required === false && (this.value === undefined || this.value === null))
            return this.value

        this.isType()
        this.isMin()
        this.isMax()
        this.isSize()
        this.isEnum()

        return this.value
    }

    error(message) {

        let text = this.prefix? `${ this.prefix } > ` : ''
            text = `${ this.name } > ${ message }`

        return {
            code: 400,
            key: 'badRequest',
            message: text,
            $details: {
                type: this.type,
                value: this.value,
                name: this.name,
                prefix: this.prefix,
                prop: this.prop,
                min: this.min,
                max: this.max,
                size: this.size,
                enum: this.enum,
                required: this.required,
            }
        }
    }
}