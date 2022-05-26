let knex = require("../utility/db/knex");

let findUserByUserId = async (id) => {
  return new Promise(function (resolve, reject) {
    knex(`user_local_info`)
      .where("user_id", id)
      .then((data) => resolve(data[0]));
  });
};

let updateUserByUserId = (id, name) => {
  return new Promise(function (resolve, reject) {
    knex
      .raw(
        `insert into user_local_info (name, user_id) values ('${name}','${id}') ON DUPLICATE KEY update name = '${name}',
last_update = CURRENT_TIMESTAMP`
      )
      .then((data) => resolve(data));
  });
};

module.exports = {
  findUserByUserId,
  updateUserByUserId,
};
