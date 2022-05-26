const express = require("express");
const router = express.Router();
const user = require("./user");
const account = require("./account");
const api_prefix = process.env.API_PREFIX;

router
/**
 * no authentication required
 */
  .post(`${api_prefix}/auth/token`, account.auth)
/**
 * authentication required
 */
  .get(`${api_prefix}/users`, account.verifyToken, user.findAllUser)
  .post(`${api_prefix}/users`, account.verifyToken, user.createUser)
  .patch(`${api_prefix}/users/:userId/credential`, account.verifyToken, user.updateCredential)
  .patch(`${api_prefix}/users/:userId/profile`, account.verifyToken, user.updateProfile)
  .get(`${api_prefix}/users/:userId/profile`, account.verifyToken, user.getProfile)
  .post(`${api_prefix}/users/:userId/emailverification`, account.verifyToken, user.sendVerificationEmail)
  .get(`${api_prefix}/users/statistic`, account.verifyToken, user.findStatistic)
  ;

module.exports = router;
