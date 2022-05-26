let { findUserByUserId, updateUserByUserId } = require("./userRepository");
let { findUserAccess } = require("./authRepository");

let Repo = {
  findUserByUserId,
  updateUserByUserId,
  findUserAccess,
};

module.exports = Repo;
