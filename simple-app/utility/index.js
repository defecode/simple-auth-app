const axios = require("axios").default;
const bcrypt = require("bcryptjs");
require("dotenv").config();

var body = {
  client_id: process.env.AUTH0_CLIENT_ID,
  client_secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  grant_type: process.env.AUTH0_GRANT_TYPE,
};

async function encrypt(text) {
  let encryptedText = await bcrypt.hash(text, 10);
  return encryptedText;
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
  const resp = await callAPI("post", process.env.AUTH_URL_TOKEN, body, {});
  global.access_token = resp.data.access_token;
}

function getDateCustom(MyDate){
  var MyDateString;
  
  MyDateString = MyDate.getFullYear() +  ('0' + (MyDate.getMonth()+1)).slice(-2) + ('0' + MyDate.getDate()).slice(-2)  ;
  return MyDateString
  }

module.exports = { getToken, callAPI, getDateCustom, encrypt };
