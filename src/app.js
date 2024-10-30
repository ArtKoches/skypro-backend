const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const mainRouter = require('./routes/main')
const userRouter = require('./routes/users')
const bookRouter = require('./routes/books')
const requestUrl = require('./middlewares/requestUrl')
const notFound = require('./middlewares/notFound')

// Env config
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

// Express app use
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(requestUrl)
app.use(mainRouter)
app.use(userRouter)
app.use(bookRouter)
app.use(notFound)

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`)
})