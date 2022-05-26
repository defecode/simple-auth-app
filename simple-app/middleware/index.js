let {
  findAllUserUsecase,
  createUserUsecase,
  getProfileUsecase,
  updateCredentialUsecase,
  sendVerificationEmailUsecase,
  findStatisticUsecase,
  updateProfileUsecase
} = require("./userUsecase");
let { findUserAccessUsecase } = require("./authUsecase");

let Usecase = {
  findAllUserUsecase,
  createUserUsecase,
  getProfileUsecase,
  updateCredentialUsecase,
  sendVerificationEmailUsecase,
  findStatisticUsecase,
  findUserAccessUsecase,
  updateProfileUsecase
};

module.exports = Usecase;
