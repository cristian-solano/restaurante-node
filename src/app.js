//? Dependencias 
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


//? Initial configuration 
const app = express()

// Enable incoming Json data

app.use(express.json())
app.unsubscribe(express.urlencoded({extended: true}))
