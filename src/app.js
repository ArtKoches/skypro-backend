const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const requestUrl = require('./middlewares/requestUrl')
const notFound = require('./middlewares/notFound')

// Env configuration
dotenv.config()
const {
    PORT = 3005,
    API_URL = 'http://127.0.0.1',
    MONGO_URL = 'mongodb://localhost:27017/mydb'
} = process.env

// MongoDb connect
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('Connected to MongoDb')
})
.catch((err)=> {
    if(err) throw err
})

// Express app
const app = express()

//server start
const welcomeToLibrary = (request, response) => {
    response.status(200)  
    response.send('Welcome to the library of your dreams!')
}
app.get('/', welcomeToLibrary)

//express use
app.use(cors())
app.use(bodyParser.json())
app.use(requestUrl)
app.use(userRouter)
app.use(notFound)

//express server listener
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`)
})