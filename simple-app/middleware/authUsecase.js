let authUsecase = (module.exports = {});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let repo = require("../repo");

authUsecase.findUserAccessUsecase = async (username, password) => {
  let auth = await repo.findUserAccess(username);
  if (!auth) return null;

  let response = await bcrypt.compare(password, auth.password);
  if (!response) return null;

  let userdata = { username: username };
  const token = jwt.sign(userdata, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION_IN_MS,
  });

  return token;
};
