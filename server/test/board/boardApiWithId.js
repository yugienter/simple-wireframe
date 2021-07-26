const chai = require("chai");
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require("chai-http");
const server = require("../../app");
const bcrypt = require("bcryptjs");
const utils = require("../helper/utils");
const Board = require("../../models/board");
const User = require("../../models/user");
const Task = require("../../models/task");
const { ObjectId } = require("mongodb");

const should = chai.should();

chai.use(chaiHttp);

describe('api/board/:boardId', function () {
  beforeEach(async function () {
    const { token, userId } = await utils.getHeadersConfig({});
    this.authorId = userId;
    this.token = token;
    const newBoard = await utils.createSimpleBoard({ userId });
    this.boardId = newBoard._id.toString();
    this.boardName = newBoard.name;
  })
  afterEach(async function () {
    await User.deleteMany({});
    await Board.deleteMany({});
  });
  context('GET : getBoardById : SUCCESS', function () {
    it('should get simple Board if have no param in query', function (done) {
      chai.request(server)
        .get(`/api/board/${this.boardId}?short=true`)
        .set('Authorization', this.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id').eql(this.boardId);
          expect(res.body).to.not.have.property('columns');
          done();
        });
    });
    it('should get full Board if query params has short = false', function (done) {
      chai.request(server)
        .get(`/api/board/${this.boardId}`)
        .set('Authorization', this.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id').eql(this.boardId);
          expect(res.body).to.have.property('columns');
          done();
        });
    });
  })
  context('POST : updateBoard : SUCCESS', function () {
    it('should update Board', function (done) {
      chai.request(server)
        .post(`/api/board/${this.boardId}`)
        .send({ 'name': 'BoardUpdate', 'description': 'TestUpdate' })
        .set({ 'API-Key': 'foobar', Accept: 'application/json' })
        .set('Authorization', this.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('boardId').eql(this.boardId);
          Board.findById(this.boardId).then(board => {
            assert.equal(board.name, 'BoardUpdate');
            assert.equal(board.description, 'TestUpdate');
            done();
          })
        });
    });
    it('should update nothing when wrong boardId', function (done) {
      const newBoardId = ObjectId();
      chai.request(server)
        .post(`/api/board/${newBoardId}`)
        .send({ 'name': 'BoardUpdate', 'description': 'TestUpdate' })
        .set({ 'API-Key': 'foobar', Accept: 'application/json' })
        .set('Authorization', this.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          Board.findById(newBoardId).then(board => {
            expect(board).to.be.null;
            done();
          })
        });
    });
  })
  context('DELETE : deleteBoard : ', function () {
    beforeEach(async function () {
      const foundBoard = await Board.findOne(
        { _id: this.boardId },
        "_id name columns"
      );
      const newTask = new Task({
        title: 'NewTask',
        description: 'TestTask',
        author: this.authorId,
        board: this.boardId
      });
      const savedTask = await newTask.save();
      foundBoard.columns[0].tasks.push(savedTask._id);
      await foundBoard.save();
    })
    afterEach(async function () {
      await Task.deleteMany();
    })
    context('SUCCESS', function () {
      it('should delte Board and all Task if is author', function (done) {
        chai.request(server)
          .delete(`/api/board/${this.boardId}`)
          .set({ 'API-Key': 'foobar', Accept: 'application/json' })
          .set('Authorization', this.token)
          .end((err, res) => {
            res.should.have.status(200);
            Board.findById(this.boardId).then(board => {
              expect(board).to.be.null;
              Task.find({ boardId: this.boardId }).then(task => {
                assert.equal(task.length, 0);
                done();
              })
            })
          });
      });
    })
    context('FAIL', function () {
      before(async function () {
        const { token, userId } = await utils.getHeadersConfig(
          { username: 'newuser' }
        );
        this.notAuthorToken = token;
      })
      after(async function () {
        await User.deleteOne({ username: 'newuser' });
      })
      it('should return 401 if user is not author', function (done) {
        chai.request(server)
          .delete(`/api/board/${this.boardId}`)
          .set({ 'API-Key': 'foobar', Accept: 'application/json' })
          .set('Authorization', this.notAuthorToken)
          .end((err, res) => {
            res.should.have.status(401);
            Board.findById(this.boardId).then(board => {
              board.should.be.a('object');
              board.should.have.property('name').eql(this.boardName);
              done();
            })
          });
      });
    })
  })
});