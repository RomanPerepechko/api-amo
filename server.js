const express = require('express')

const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8081
const cors = require('cors');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
const routes = require('./server/routes')
routes(app)

app.listen(PORT, () => console.log('server start on port:' + PORT))