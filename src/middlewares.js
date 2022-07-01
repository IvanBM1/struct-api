const Services = require('./services')
const Messages = require('./messages')
const Config = require('./config')

module.exports = {
    auth,
    serverError,
    serverNotFound,
    responseData,
    responseError,
    responseFile,
    responseHtml,
    responseRedirect
}

async function auth(request, response, next) {
    try {

        const token = request.headers.token
    
        if(!token)
            return response.$error(new Messages().tokenNotFound)
    
        const session = await Services.Sessions.verifySession(token)
    
        request.userId = session.userId
    
        next()

    } catch(error) {
        response.$error(error)
    }
}

async function serverError(error, request, response, next) {
    response.$error(new Messages(error).serverError)
}

async function serverNotFound(request, response) {
    response.$error(new Messages().serverNotFound)
}

async function responseData(request, response, next) {
    response.$data = data => {
        response.status(200).send({
            success: true,
            data
        })
    }
    next()
}

async function responseError(request, response, next) {
    response.$error = error => {

        if(Config.enviroment === 'development') {
            console.info(`[APP] (ERROR)`)
            console.info(error)
        }

        if(!error || !error.code || !error.key)
            error = {
                code: 503,
                key: 'serverUnknow',
                message: 'Error en el servidor',
                $details: error,
                $stack: (error.stack || []).split('\n')
            }

        response.status(error.code || 503).send({
            success: false,
            error
        })
    }
    next()
}

async function responseHtml(request, response, next) {
    response.$html = html => {
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.status(200).send(html)
    }
    next()
}

async function responseFile(request, response, next) {
    response.$file = data => {
        response.setHeader('Content-Type', data.contentType)
        response.send(data.file)
    }
    next()
}

async function responseRedirect(request, response, next) {
    response.$redirect = url => response.redirect(url)
    next()
}