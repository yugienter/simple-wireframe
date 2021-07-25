const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const should = chai.should();

chai.use(chaiHttp);

describe('Login', function () {
  beforeEach(async () => {
    this.username = 'username123';
    this.password = '12345';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    const newUser = new User({
      username: this.username,
      password: hashedPassword
    });
    await newUser.save();
  })
  afterEach(async () => {
    await User.deleteMany({});
  });
  describe('POST api/login Success', function () {
    it('should return status 200 if password and username is match',
      function (done) {
        chai.request(server)
          .post('/api/login')
          .send({ 'username': 'username123', 'password': '12345' })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should
              .have.property('user')
              .have.property('username').eql('username123');
            res.body.should.be.a('object');
            done();
          });
      });
  })
  describe('POST api/login Fail', function () {
    it('should return status 400 if password is not match',
      function (done) {
        chai.request(server)
          .post('/api/login')
          .send({ 'username': 'username123', 'password': '54321' })
          .end(function (err, res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.be.a('object');
            done();
          });
      });
  })
  describe('POST api/login Fail', function () {
    it('should return status 404 if username does not exist',
      function (done) {
        chai.request(server)
          .post('/api/login')
          .send({ 'username': 'user123', 'password': '12345' })
          .end(function (err, res) {
            res.should.have.status(404);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.be.a('object');
            done();
          });
      });
  })
});