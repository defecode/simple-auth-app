var express = require('express')
var indexRouter = require('./routes')
const { auth } = require('express-openid-connect');
const schedule = require("node-schedule");
var functions = require('./utilitties')
require('dotenv').config()


const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
  secret: process.env.SECRET
};


var app = express()
app.set('views','views')
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(auth(config));
app.use('/',indexRouter)

functions.getToken()
const job = schedule.scheduleJob("0 */12 * * *", function () {
    functions.getToken();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Express is running on port 3000')
})