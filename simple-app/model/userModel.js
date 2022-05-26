
let buildNewUser = (userValidator)=> {
    return ({
      email,
      password
    } = {}) => {
      let {error} = userValidator({email,password})
      if (error) throw new Error(error)
  
      return {
        getEmail: () => email,
        getPassword: () => password
      }
    }
  }


let buildNewAuth = (userValidator)=> {
  return ({
    username,
    password
  } = {}) => {
    let {error} = userValidator({username,password})
    if (error) throw new Error(error)

    return {
      getUsername: () => username,
      getPassword: () => password
    }
  }
}

let buildNewUpdateCredential = (userValidator)=> {
  return ({
    userId,
    oldPassword,
    newPassword,
    newPasswordAgain
  } = {}) => {
    let {error} = userValidator({userId,oldPassword,newPassword,newPasswordAgain})
    if (error) throw new Error(error)

    return {
      getUserID: () => userId,
      getOldPassword: () => oldPassword,
      getNewPassword: () => newPassword,
      getNewPasswordAgain: () => newPasswordAgain
    }
  }
}

let buildNewGetProfile = (userValidator)=> {
  return ({
    userId
  } = {}) => {
    let {error} = userValidator({userId})
    if (error) throw new Error(error)

    return {
      getUserId: () => userId
    }
  }
}

let buildNewEmailVerification = (userValidator)=> {
  return ({
    userId
  } = {}) => {
    let {error} = userValidator({userId})
    if (error) throw new Error(error)

    return {
      getUserId: () => userId
    }
  }
}

let buildNewUpdateProfile = (userValidator)=> {
  return ({
    userId
  } = {}) => {
    let {error} = userValidator({userId})
    if (error) throw new Error(error)

    return {
      getUserId: () => userId
    }
  }
}


  module.exports = { buildNewUser,buildNewAuth,buildNewUpdateCredential,buildNewGetProfile,buildNewEmailVerification,buildNewUpdateProfile }