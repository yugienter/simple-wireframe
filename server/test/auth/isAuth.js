const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const bcrypt = require("bcryptjs");
const authJWT = require("../helper/autJWT");

const should = chai.should();

chai.use(chaiHttp);

describe('isAuth', function () {
  describe('GET api/isAuth Success', function () {
    it('should return status 200 if isAuth', async function () {
      const { token, username } = await authJWT.getHeadersConfig({});
      let chain = chai.request(server).get('/api/isAuth');
      chain = chain.set('Authorization', token);
      chain.end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('authorized').eql(true);
        res.body.should.have.property('user').should.be.a('object');
        res.body.should
          .have.property('user')
          .have.property('username').eql(username);
        res.body.should.be.a('object');
      });
    });
  })
});