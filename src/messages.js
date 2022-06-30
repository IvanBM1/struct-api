module.exports = class Messages {

    constructor($details, $message) {

        this.serverError = {
            code: 503,
            key: 'serverError',
            message: $message || 'Error en el servidor',
            $details
        }

        this.serverNotFound = {
            code: 404,
            key: 'serverNotFound',
            message: $message || 'Recurso no encontrado',
            $details
        }

        this.tokenNotFound = {
            code: 404,
            key: 'tokenNotFound',
            message: $message || 'Se requiere el token de sessión',
            $details
        }
    }
}