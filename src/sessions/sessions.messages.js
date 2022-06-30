module.exports = class Messages {

    constructor($details, $message) {

        this.sessionSaveError = {
            code: 503,
            key: 'sessionSaveError',
            message: $message || 'Error al guardar la información del sesión',
            $details
        }

        this.sessionGetError = {
            code: 503,
            key: 'sessionGetError',
            message: $message || 'Error al obtener la información del sesión',
            $details
        }

        this.sessionNotFound = {
            code: 404,
            key: 'sessionNotFound',
            message: $message || 'El registro del sesión no fue encontrado',
            $details
        }

        this.sessionDeleteError = {
            code: 503,
            key: 'sessionDeleteError',
            message: $message || 'Error al borrar la información del sesión',
            $details
        }

        this.sessionExpired = {
            code: 401,
            key: 'sessionExpired',
            message: $message || 'La sesión ha expirado',
            $details
        }
    }
}