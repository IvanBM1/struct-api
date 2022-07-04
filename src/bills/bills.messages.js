module.exports = class Messages {

    constructor($details, $message) {

        this.billSaveError = {
            code: 503,
            key: 'billSaveError',
            message: $message || 'Error al guardar la información del gasto',
            $details
        }

        this.billGetError = {
            code: 503,
            key: 'billGetError',
            message: $message || 'Error al obtener la información del gasto',
            $details
        }

        this.billNotFound = {
            code: 404,
            key: 'billNotFound',
            message: $message || 'El registro del gasto no fue encontrado',
            $details
        }

        this.billDeleteError = {
            code: 503,
            key: 'billDeleteError',
            message: $message || 'Error al borrar la información del gasto',
            $details
        }
    }
}