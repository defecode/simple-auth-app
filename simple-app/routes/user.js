let user = (module.exports = {});
let userUsecase = require("../middleware");
const model = require("../model");

user.updateProfile = async (req, res, next) => {
  /**
   * validation
   */
   try {
    let payload = Object.assign({},req.body);
    payload.userId = req.params.userId;
    let user = model.updateProfile(payload);
  } catch (err) {
    next(err);
    return;
  }

  try {
   console.log(req.body)
    let result = await userUsecase.updateProfileUsecase(
      req.params.userId,
      req.body.name
    );
    return res.status(200).send({ description: "successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error has occured",
    });
  }
};

user.findAllUser = async (req, res, next) => {
  let data = [];
  try {
    data = await userUsecase.findAllUserUsecase();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error has occured",
    });
  }
  return res.status(200).send(data);
};

user.createUser = async (req, res, next) => {
  /**
   * validation
   */
  try {
    let user = model.newUser(req.body);
  } catch (err) {
    next(err);
    return;
  }

  /**execution after validation */
  try {
    let result = null;
    try {
      req.body.connection = process.env.AUTH_CONNECTION;
      req.body.name = req.body.email.split("@")[0];
      result = await userUsecase.createUserUsecase(req.body);
    } catch (resultErr) {
      console.log(resultErr.response.data);
      return res.status(resultErr.response.data.statusCode).send({
        errorName: `[Auth0] ${resultErr.response.data.error} - ${resultErr.response.data.errorCode}`,
        errorDescription: resultErr.response.data.message,
      });
    }
    return res.status(201).send({ userId: result.user_id });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error has occured",
    });
  }
};

user.getProfile = async (req, res, next) => {
  try {
    let result = null;
    try {
      result = await userUsecase.getProfileUsecase(req.params.userId);
    } catch (resultErr) {
      console.log(resultErr.response.data);
      return res.status(resultErr.response.data.statusCode).send({
        errorName: `[Auth0] ${resultErr.response.data.error} - ${resultErr.response.data.errorCode}`,
        errorDescription: resultErr.response.data.message,
      });
    }

    return res.status(200).send({ name: result.name, email: result.email });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error has occured",
    });
  }
};

user.updateCredential = async (req, res, next) => {
  /**
   * validation
   */
  try {
    req.body.userId = req.params.userId;
    let user = model.updateCredential(req.body);
  } catch (err) {
    next(err);
    return;
  }

  try {
    let result = null;
    try {
      let data = {};
      let data_current = {};
      data.connection = process.env.AUTH_CONNECTION;
      data.password = req.body.newPassword;
      data_current.oldPassword = req.body.oldPassword;
      let user = await userUsecase.getProfileUsecase(req.params.userId);
      data_current.username = user.email;

      result = await userUsecase.updateCredentialUsecase(
        req.params.userId,
        data,
        data_current
      );
    } catch (resultErr) {
      return res.status(resultErr.response.status).send({
        errorName: `[Auth0] ${resultErr.response.data.error} - ${
          resultErr.response.data.errorCode
            ? resultErr.response.data.errorCode
            : ""
        }`,
        errorDescription: resultErr.response.data.message
          ? resultErr.response.data.message
          : resultErr.response.data.error_description,
      });
    }
    return res.status(200).send({ description: "successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error has occured",
    });
  }
};

user.sendVerificationEmail = async (req, res, next) => {
  try {
    let result = null;
    try {
      let profile = await userUsecase.getProfileUsecase(req.params.userId);

      if (profile.identities[0].isSocial)
        return res.status(400).send({
          errorName: "user account is social",
          errorDescription: "verification is not eligible for social account",
        });

      let data = {};
      data.user_id = req.params.userId;
      result = await userUsecase.sendVerificationEmailUsecase(data);
    } catch (resultErr) {
      console.log(resultErr.response.data);
      return res.status(resultErr.response.data.statusCode).send({
        errorName: `[Auth0] ${resultErr.response.data.error} - ${resultErr.response.data.errorCode}`,
        errorDescription: resultErr.response.data.message,
      });
    }
    return res.status(200).send({ description: "successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error has occured",
    });
  }
};

user.findStatistic = async (req, res, next) => {
  try {
    let result = null;
    try {
      result = await userUsecase.findStatisticUsecase();
    } catch (resultErr) {
      console.log(resultErr.response.data);
      return res.status(resultErr.response.data.statusCode).send({
        errorName: `[Auth0] ${resultErr.response.data.error} - ${resultErr.response.data.errorCode}`,
        errorDescription: resultErr.response.data.message,
      });
    }
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error has occured",
    });
  }
};
