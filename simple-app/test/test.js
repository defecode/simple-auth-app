const { doesNotMatch } = require("assert");
var assert = require("assert");
const middleware = require("../middleware");
const functions = require("../utility");

describe("Generate Token", function () {
  describe("Exist", function () {
    it("should return true when passing correct username & password", async function () {
      const data = await middleware.findUserAccessUsecase("testing", "testing");
      assert.equal(true, data === null ? false : true);
    });
  });
  describe("Not Exist", function () {
    it("should return false when passing incorrect username/password", async function () {
      const data = await middleware.findUserAccessUsecase(
        "testing123",
        "testing123"
      );
      assert.equal(false, data === null ? false : true);
    });
  });
});

describe("Get statistic", function () {
  describe("Exist", function () {
    it("should return true when successfully query statistic", function () {
      functions.getToken().then(() => {
        middleware.findStatisticUsecase().then((data) => {
          done();
          assert.equal(true, data ? true : false);
        });
      });
    });
  });
});
