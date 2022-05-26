var express = require("express");
var router = express.Router();
var functions = require("../utilitties");

let verifyAuth = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).send({
      errorName: "Invalid-Token",
      errorDescription: "A token is required for authentication",
    });
  }
  next();
};

router.get("/", async (req, res) => {
  console.log(req.oidc.user)
  res.render("index", {
    title: "My Simple App",
    baseUrl: process.env.BASEURL,
    isAuthenticated: req.oidc.isAuthenticated(),
    isEmailVerified: req.oidc.isAuthenticated()?req.oidc.user.email_verified:null
  });
});

router.get("/call/get-list-users", verifyAuth, async (req, res) => {
  try {
    let data = await functions.callAPI(
      "get",
      process.env.BACKEND_API_USER,
      {},
      { headers: { "x-access-token": global.access_token } }
    );

    return res.status(200).send(data.data);
  } catch (error) {
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error occured",
    });
  }
});

router.get("/call/get-statistics", verifyAuth, async (req, res) => {
  try {
    let data = await functions.callAPI(
      "get",
      process.env.BACKEND_API_STATISTIC,
      {},
      { headers: { "x-access-token": global.access_token } }
    );
    return res.status(200).send(data.data);
  } catch (error) {
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error occured",
    });
  }
});

router.get("/call/get-profile", verifyAuth, async (req, res) => {
  try {
    let data = await functions.callAPI(
      "get",
      `${process.env.BACKEND_API_USER}/${req.oidc.user.sub}/profile`,
      {},
      { headers: { "x-access-token": global.access_token } }
    );
    return res.status(200).send(data.data);
  } catch (error) {
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error occured",
    });
  }
});

router.get("/call/send-verification-email", verifyAuth, async (req, res) => {
  try {
    let data = await functions.callAPI(
      "post",
      `${process.env.BACKEND_API_USER}/${req.oidc.user.sub}/emailverification`,
      {},
      { headers: { "x-access-token": global.access_token } }
    );
    return res.status(200).send(data.data);
  } catch (error) {
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error occured",
    });
  }
});

router.post("/call/update-password", verifyAuth, async (req, res) => {
  try {
    let data = await functions.callAPI(
      "patch",
      `${process.env.BACKEND_API_USER}/${req.oidc.user.sub}/credential`,
      req.body,
      { headers: { "x-access-token": global.access_token } }
    );
    console.log(data)
    return res.status(200).send(data.data);
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error occured",
    });
  }
});

router.post("/call/update-name", verifyAuth, async (req, res) => {
  try {
    let data = await functions.callAPI(
      "patch",
      `${process.env.BACKEND_API_USER}/${req.oidc.user.sub}/profile`,
      req.body,
      { headers: { "x-access-token": global.access_token } }
    );
    console.log(data)
    return res.status(200).send(data.data);
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      errorName: "Internal-Error",
      errorDescription: "Internal error occured",
    });
  }
});

module.exports = router;
