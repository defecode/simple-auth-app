const axios = require("axios").default;
axios.defaults.timeout = 10000;
require('dotenv').config()

var body = {
    username: process.env.BACKEND_USERNAME,
    password: process.env.BACKEND_PASSWORD
  };

function callAPI(method, url, body, header) {
  switch (method) {
    case "post" || "":
      return new Promise((resolve, reject) => {
     
        axios
          .post(url, body, header)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    case "put" || "":
      return new Promise((resolve, reject) => {
        axios
          .put(url, body, header)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    case "patch" || "":
      return new Promise((resolve, reject) => {
        axios
          .patch(url, body, header)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    case "get":
      return new Promise((resolve, reject) => {
        axios
          .get(url, header)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    default:
  }
}

async function getToken() {
  const resp = await callAPI("post", process.env.BACKEND_API, body, {});
  global.access_token = resp.data.access_token;
}

module.exports = { getToken, callAPI};
