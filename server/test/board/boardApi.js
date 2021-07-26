const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app");
const bcrypt = require("bcryptjs");
const utils = require("../helper/utils");
const Board = require("../../models/board");
const User = require("../../models/user");
const { ObjectId } = require("mongodb");

const should = chai.should();

chai.use(chaiHttp);

describe('api/board/', function () {
  describe('GET : getBoards : SUCCESS', function () {
    before(async function () {
      const { token, userId } = await utils.getHeadersConfig({});
      this.token = token;
      this.boardName = 'New Board';
      const newBoard = await utils.createSimpleBoard(
        { userId, name: this.boardName }
      );
    })
    after(async function () {
      await User.deleteMany({});
      await Board.deleteMany({});
    });
    it('should get all Board', function (done) {
      chai.request(server)
        .get('/api/board')
        .set('Authorization', this.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body
            .should.have.property('boards')
            .should.be.a('object');
          res.body['boards'][0].should.have.property('name').eql(this.boardName);
          done();
        });
    });
  })
  describe('POST : createNewBoard : SUCCESS', function () {
    before(async function () {
      await User.deleteMany({});
      await Board.deleteMany({});
      const { token, userId } = await utils.getHeadersConfig({});
      this.token = token;
      this.userId = userId;
    })
    after(async function () {
      await User.deleteMany({});
      await Board.deleteMany({});
    });
    it('should create a new Board success', function (done) {
      chai.request(server)
        .post('/api/board')
        .send({ 'name': 'BoardTest', 'description': 'Test' })
        .set({ 'API-Key': 'foobar', Accept: 'application/json' })
        .set('Authorization', this.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('board');
          res.body.board
            .should.have.property('author').eql(this.userId.toString());
          done();
        });
    })
  })
});