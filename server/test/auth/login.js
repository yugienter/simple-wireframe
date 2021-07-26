const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require('chai').assert;
const server = require("../../app");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const utils = require("../helper/utils");

const should = chai.should();

chai.use(chaiHttp);

describe('api/login', function () {
  beforeEach(async function () {
    this.username = 'username123';
    this.password = '12345';
    const { username, password } = await utils.getHeadersConfig({
      username: this.username,
      password: this.password
    });
  })
  afterEach(async function () {
    await User.deleteMany({});
  });
  context('POST : loginJWT : SUCCESS', function () {
    it('should return status 200 if password and username is match',
      function (done) {
        const username = this.username;
        chai.request(server)
          .post('/api/login')
          .send({ 'username': this.username, 'password': this.password })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should
              .have.property('user')
              .have.property('username');
            assert.equal(res.body.user.username, username);
            done();
          });
      });
  })
  context('POST : loginJWT : FAIL', function () {
    it('should return status 400 if password is not match',
      function (done) {
        chai.request(server)
          .post('/api/login')
          .send({ 'username': 'username123', 'password': '54321' })
          .end(function (err, res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
          });
      });
  })
  context('POST : loginJWT : FAIL', function () {
    it('should return status 404 if username does not exist',
      function (done) {
        chai.request(server)
          .post('/api/login')
          .send({ 'username': 'user123', 'password': '12345' })
          .end(function (err, res) {
            res.should.have.status(404);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
          });
      });
  })
});