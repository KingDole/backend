//setup... this is similar to when we use our default tags in html
const express = require ("express");
//we have to use cors in order to host a front end and backend on the same device
var cors = require('cors');
//activate or tell this app variable to be an express server

const bodyParser = require('body-parser')
const Song = require("./models/songs")
const app = express()
app.use(cors())

app.use(bodyParser.json())
const router = express.Router()



//all requests the usually use an API start wih /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)