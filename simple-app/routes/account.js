const model = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let account = (module.exports = {});
let authUsecase = require("../middleware");

account.auth = async (req, res, next) => {

  try {
    let authModel = model.newAuth(req.body);
  } catch (error) {
    next(error)
    return
  }
  
  try {
    let result = await authUsecase.findUserAccessUsecase(
      req.body.username,
      req.body.password
    );

    if (result)
      return res
        .status(200)
        .json({
          access_token: result,
          expires_in: process.env.TOKEN_EXPIRATION_IN_MS,
          type: "bearer",
        });

    return res
      .status(401)
      .send({
        errorName: "Invalid-Credential",
        errorDescription: "Wrong username or password",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({
        errorName: "Invalid-Credential",
        errorDescription: "Wrong username or password",
      });
  }
};

account.verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .send({
        errorName: "Invalid-Token",
        errorDescription: "A token is required for authentication",
      });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.decoded = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .send({ errorName: "Invalid-Token", errorDescription: "Invalid Token" });
  }
};
