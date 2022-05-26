const express = require("express");
const app = express();
var cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const routes = require("./routes");
const schedule = require("node-schedule");
var functions = require('./utility')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json')

require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Logging request
 */
app.use((req, res, next) => {
  req.header.uuid = uuidv4();
  console.log(
    new Date() + "  " + req.header.uuid + "-" + JSON.stringify(req.body)
  );
  next();
});
/**
 * Swagger Doc API
 */
app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
/**
 * Main router here
 */
app.use(routes);

/**
 * init token Auth0 and put schedule to refresh the token before getting expired
 */
functions.getToken();
const job = schedule.scheduleJob("0 */12 * * *", function () {
    functions.getToken();
});

/**
 * BOILERPLATE
 */

/**
 * Catch and send error messages
 */
app.use((err, req, res, next) => {
  
  if (err) {
    //console.error(err.message);
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    /**
     * Set 500 server code error if statuscode not set
     */
    let response = {
      errorName: err.statusCode,
      errorDescription: err.message,
    };
    /**
     * Logging Response
     */
    console.log(
      new Date() + "  " + req.header.uuid + "-" + JSON.stringify(response)
    );
    return res.status(err.statusCode).send(response);
  }

  next();
});

/**
 * Default page if not found (404)
 */
app.use(function (req, res) {
  res.status(404).json({
    status: "Page does not exist",
  });
});

/**
 * Running the server
 */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
