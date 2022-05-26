let Joi = require('joi')

let validator = (schema) =>
  (payload) => {
    const {error,value} = schema.validate(payload)
    if (error) {
      let message = error.details.map(el => el.message).join('\n')
      return {
        error: message      
      }
    }
    return true
  }

module.exports = validator