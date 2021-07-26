const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const bcrypt = require("bcryptjs");
const authJWT = require("../helper/utils");
const User = require("../../models/user");

const should = chai.should();

chai.use(chaiHttp);

describe('api/isAuth', function () {
  describe('GET : isAuthenticated : SUCCESS', function () {
    afterEach(async function () {
      await User.deleteMany({});
    });
    it('should return status 200 if isAuth', function (done) {
      authJWT.getHeadersConfig({}).then(({ token, username }) => {
        chai.request(server)
          .get('/api/isAuth')
          .set('Authorization', token)
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('authorized').eql(true);
            res.body.should.have.property('user').should.be.a('object');
            res.body.should
              .have.property('user')
              .have.property('username').eql(username);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  })
});