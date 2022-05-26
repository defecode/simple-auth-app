let userUsecase = (module.exports = {});
let functions = require("../utility");
let repo = require("../repo");

userUsecase.findStatisticUsecase = async () => {
  /**
   * call API Auth0 to get daily statistic all the time
   */
  const responseStatisticDaily = await functions.callAPI(
    "get",
    `${process.env.AUTH_URL_STATISTIC_DAILY}`,
    {},
    { headers: { Authorization: `Bearer ${global.access_token}` } }
  );

  /**
   * call API Auth0 to get daily statistic for last 7 days
   */

  let d = new Date();
  d.setDate(d.getDate() - process.env.LAST_STATISTIC_DAY);
  d.setHours(0, 0, 0, 0);
  let from = functions.getDateCustom(d);

  d = new Date();
  d.setHours(0, 0, 0, 0);
  let to = functions.getDateCustom(d);

  const responseStatisticDaily7Days = await functions.callAPI(
    "get",
    `${process.env.AUTH_URL_STATISTIC_DAILY}?from=${from}&to=${to}`,
    {},
    { headers: { Authorization: `Bearer ${global.access_token}` } }
  );

  /**
   * call API Auth0 to get active session
   */
  const responseStatisticActiveUser = await functions.callAPI(
    "get",
    `${process.env.AUTH_URL_STATISTIC_ACTIVE_USERS}`,
    {},
    { headers: { Authorization: `Bearer ${global.access_token}` } }
  );

  const data = responseStatisticDaily.data;
  var sumTotalSignup = 0;
  data.forEach((currentRecord) => {
    sumTotalSignup += currentRecord.signups;
  });

  const data7days = responseStatisticDaily7Days.data;
  var sumActiveSessionLast7Days = 0;
  data7days.forEach((currentRecord) => {
    sumActiveSessionLast7Days += currentRecord.logins;
  });

  let result = {
    totalSignup: sumTotalSignup,
    activeSession: responseStatisticActiveUser.data,
    activeSessionLast7Days: Math.ceil(sumActiveSessionLast7Days / 7),
  };
  return result;
};

userUsecase.sendVerificationEmailUsecase = async (data) => {
  /**
   * call API Auth0 to send verification email
   */
  const response = await functions.callAPI(
    "post",
    `${process.env.AUTH_URL_JOB_EMAIL_VERIFICATION}`,
    data,
    { headers: { Authorization: `Bearer ${global.access_token}` } }
  );

  return response.data;
};

userUsecase.updateCredentialUsecase = async (userId, data, data_current) => {
  /**
   * call API Auth0 to udate credential
   */
  var body = {
    grant_type: "password",
    username: data_current.username,
    password: data_current.oldPassword,
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE
  };

  const user = await functions.callAPI(
    "post",
    `${process.env.AUTH_URL_TOKEN}`,
    body,
    {
      /*headers: { "content-type": "application/x-www-form-urlencoded" }*/
    }
  );

  if (user.status == 200) {
    const response = await functions.callAPI(
      "patch",
      `${process.env.AUTH_URL_USERS}/${userId}`,
      data,
      { headers: { Authorization: `Bearer ${global.access_token}` } }
    );

    return response.data;
  } else {
    return user
  }
};

userUsecase.updateProfileUsecase = async (userId,name) => {
  const user_local = await repo.updateUserByUserId(userId,name);
}

userUsecase.getProfileUsecase = async (userId) => {
  /**
   * call API Auth0 get profile username/email
   */
  const response = await functions.callAPI(
    "get",
    `${process.env.AUTH_URL_USERS}/${userId}`,
    {},
    { headers: { Authorization: `Bearer ${global.access_token}` } }
  );
  
  const user_local = await repo.findUserByUserId(userId);
  response.data.name = (user_local != undefined && user_local.name.trim() != "")?user_local.name:response.data.name; /** overide name if any */
  return response.data;
};

userUsecase.createUserUsecase = async (data) => {
  /**
   * call API Auth0 to create user by username and password
   */
  const response = await functions.callAPI(
    "post",
    process.env.AUTH_URL_USERS,
    data,
    { headers: { Authorization: `Bearer ${global.access_token}` } }
  );

  return response.data;
};

userUsecase.findAllUserUsecase = async () => {
  /**
   * call API Auth0 to get list user
   */
  const response = await functions.callAPI(
    "get",
    process.env.AUTH_URL_USERS,
    {},
    { headers: { Authorization: `Bearer ${global.access_token}` } }
  );

  /**
   * enrich field name if social and exist in local db
   */
  let data = response.data;
  for (const elm of data) {
    if (elm.identities[0].isSocial) {
      let localuser = await repo.findUserByUserId(elm.user_id);
      if (localuser) {
        elm.name = localuser.name;
      }
    }
  }

  /**
   * remap the response
   */
  data = data.map((obj) => {
    return {
      signUpDate: obj.created_at,
      userId: obj.user_id,
      name: obj.name,
      email: obj.email,
      loginCount: obj.logins_count,
      lastSessionCookiesDate: obj.last_login,
    };
  });
  return data;
};
