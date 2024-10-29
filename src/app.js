const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const loggerOne = require('./middlewares/loggerOne')

dotenv.config()

const {
    PORT = 3000,
    API_URL = 'http://127.0.0.1',
    MONGO_URL = 'mongodb://localhost:27017/mydb'
} = process.env

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('Connected to MongoDb')
})
.catch((err)=> {
    if(err) throw err
    console.log('MongoDb Error')
}) 

const app = express()

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