let { buildNewUser,buildNewAuth,buildNewGetProfile,buildNewEmailVerification,buildNewUpdateCredential,buildNewUpdateProfile} = require("./userModel");
let userSchema = require("./user-schema");
let newUserValidator = require("./validator")(userSchema.newUserSchema());
let authValidator = require("./validator")(userSchema.newAuth());
let newVerificationEmailValidator = require("./validator")(userSchema.verificationEmail());
let profileValidator = require("./validator")(userSchema.profile());
let updateCredentialValidator = require("./validator")(userSchema.updateCredential());
let updateProfileValidator = require("./validator")(userSchema.updateProfile());
let newUser = buildNewUser(newUserValidator);
let newAuth = buildNewAuth(authValidator);
let updateCredential = buildNewUpdateCredential(updateCredentialValidator);
let profile = buildNewGetProfile(profileValidator);
let updateProfile = buildNewUpdateProfile(updateProfileValidator);
let verificationEmail = buildNewEmailVerification(newVerificationEmailValidator);

module.exports = { newUser ,newAuth,updateCredential,profile,verificationEmail,updateProfile};
