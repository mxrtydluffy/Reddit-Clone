// test/auth.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, after } = require("mocha");
const app = require("../server");

const should = chai.should();

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(app);

const User = require("../models/user");

describe("User", function () {

  // TESTING
  it("should not be able to login if they have not registered", function (done) {
    agent
      .post("/login", { email: "wrong@example.com", password: "nope" })
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });

  // SIGNUP
  it("should be able to signup", function (done) {
    User.findOneAndDelete({ username: "testone" })
    .then(function () {
    agent
        .post("/sign-up")
        .send({ username: "testone", password: "password" })
        .end(function (err, res) {
        console.log(res.body);
        res.should.have.status(200);
        agent.should.have.cookie("nToken");
        done();
        });
    })
    .catch(function (err) {
        done(err);
    })
  });

  // LOGIN
  it("Should be able to login", function (done) {
    agent
        .post("/login")
        .send({ username: "testone", password: "password" })
        .end(function (err, res) {
            res.should.have.status(200);
            agent.should.have.cookie("nToken");
            done();
        });
  });

  // LOGOUT
  it("Should be able to logout", function (done) {
    agent.get("/logout").end(function (err, res) {
        res,should.have.status(200);
        agent.should.not.have.cookie("nToken");
        done();
    });
  });

  after(function () {
    return User.findOneAndDelete({ username: "testone" });
  });
});