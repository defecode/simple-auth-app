let Joi = require('joi')

let newUserSchema = ()=>{
  return Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(/^(?=.*[#$@!%&*?])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'password')
  })
}
let profile = ()=>{
  return Joi.object({
    userId:Joi.string().required()
  })
}

let updateProfile = ()=>{
  return Joi.object({
    userId:Joi.string().required()
  })
}

let verificationEmail = ()=>{
  return Joi.object({
    userId:Joi.string().required()
  })
}

let updateCredential = ()=>{
  return Joi.object({
    userId:Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().pattern(/^(?=.*[#$@!%&*?])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'password'),
    newPasswordAgain: Joi.any().valid(Joi.ref('newPassword')).required()
  })
}

let newAuth = ()=>{
  return Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}

module.exports = {newUserSchema,newAuth,updateCredential,profile,verificationEmail,updateProfile}
