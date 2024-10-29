// const http = require('http');
// const getUsers = require('./modules/users')
// const host = 'http://127.0.0.1'
// const port = 3003
        
// const endpoint = {
//     MAIN: '/',
//     USERS: '/?users',
//     HELLO: '/?hello'
// }

// const server = http.createServer((request, response) => {
//     const url = new URL(request.url, host)
//     const userName = url.searchParams.get('hello')

//     if(userName) {
//         response.statusCode = 200
//         response.statusMessage = 'OK'
//         response.appendHeader("Content-Type", "text/plain")
//         response.write(`Hello, ${userName}.`)   
//         response.end()

//         return
//     }
    
//     switch (request.url) {
//         case endpoint.MAIN:
//             response.statusCode = 200
//             response.statusMessage = 'OK'
//             response.appendHeader("Content-Type", "text/plain")
//             response.write('Hello, World!')
//             response.end()
//             break;
//         case endpoint.USERS:
//             response.statusCode = 200
//             response.statusMessage = 'OK'
//             response.appendHeader("Content-Type", "application/json")
//             response.write(getUsers())
//             response.end()
//             break;
//         case endpoint.HELLO:
//             response.statusCode = 400
//             response.statusMessage = 'Bad Request'
//             response.appendHeader("Content-Type", "text/plain")
//             response.write('Enter a name')
//             response.end()
//             break;
    
//         default:
//             response.statusCode = 500
//             response.statusMessage = 'Server Error'
//             response.end()    
//             break;
//     }
// });

// server.listen(port, () => {
//     console.log(`Сервер запущен по адресу ${host}:${port}/`)    
// })

//START HW-04
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./routes/users')
const loggerOne = require('./middlewares/loggerOne')

dotenv.config()

const app = express()

const {
    PORT = 3000,
    API_URL = 'http://127.0.0.1'
} = process.env

const helloWorld = (request, response) => {
    response.status(200)
    response.send('Hello, World!')
}

app.use(cors())
app.use(loggerOne)
app.use(bodyParser.json())

app.get('/', helloWorld)

app.post('/', (request, response) => {  
    response.status(200)
    response.send('Hello from POST')
})

app.use(userRouter)

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`)
})