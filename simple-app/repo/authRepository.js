let knex = require("../utility/db/knex");

let findUserAccess = async (username) => {
  return new Promise(function (resolve, reject) {
    knex(`user_api_access`)
      .where("username", username)
      .then((data) => resolve(data[0]));
  });
};

module.exports = {
  findUserAccess
};
