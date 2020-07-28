const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit")
const morgan = require('morgan')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const port = 3000

const logger = morgan(':method :url :status :res[content-length] - :response-time ms')
app.use(logger)

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 60 // limit each IP to 60 requests per windowMs
})
app.use(limiter)

app.get('/', (req, res) => res.send('Hello World!'))

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))