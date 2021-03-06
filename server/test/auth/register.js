const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const User = require("../../models/user");

const should = chai.should();

chai.use(chaiHttp);

describe('api/register', function () {
  beforeEach(async function () {
    await User.deleteMany({});
  })
  afterEach(async function () {
    await User.deleteMany({});
  });
  describe('POST : registerUser :  SUCCESS', function () {
    it('should return status 201 if password and username is valid',
      function (done) {
        chai.request(server)
          .post('/api/register')
          .send({ 'username': 'username', 'password': 'password' })
          .end(function (err, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
          });
      });
  })
  describe('POST : registerUser : FAIL', function () {
    it('should return status 400 if have no password', function (done) {
      chai.request(server)
        .post('/api/register')
        .send({ 'username': 'username' })
        .end(function (err, res) {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
  })
  describe('POST : registerUser : FAIL', function () {
    it('should return status 400 if have no username', function (done) {
      chai.request(server)
        .post('/api/register')
        .send({ 'password': 'password' })
        .end(function (err, res) {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
  })
});