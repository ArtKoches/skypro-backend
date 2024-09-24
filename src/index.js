const http = require('http');
const getUsers = require('./modules/users')
const host = 'http://127.0.0.1'
const port = 3003

const endpoint = {
    MAIN: '/',
    USERS: '/users',
    HELLO: '/?hello'
}

const server = http.createServer((request, response) => {
    const url = new URL(request.url, host)
    const userName = url.searchParams.get('hello')

    if(userName) {
        response.statusCode = 200
        response.statusMessage = 'OK'
        response.header = 'Content-Type: text/plain'
        response.write(`Hello, ${userName}.`)   
        response.end()

        return
    }
    
    switch (request.url) {
        case endpoint.MAIN:
            response.statusCode = 200
            response.statusMessage = 'OK'
            response.header = 'Content-Type: text/plain'
            response.write('Hello, World!')
            response.end()
            break;
        case endpoint.USERS:
            response.statusCode = 200
            response.statusMessage = 'OK'
            response.header = 'Content-Type: application/json'
            response.write(getUsers())
            response.end()
            break;
        case endpoint.HELLO:
            response.statusCode = 400
            response.statusMessage = 'Bad Request'
            response.header = 'Content-Type: text/plain'
            response.write('Enter a name')
            response.end()
            break;
    
        default:
            response.statusCode = 500
            response.statusMessage = 'Server Error'
            response.header = 'Content-Type: text/plain'
            response.write('{}')
            response.end()    
            break;
    }
});

server.listen(port, () => {
    console.log(`Сервер запущен по адресу ${host}:${port}/`)    
})   