const chai = require("chai");
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require("chai-http");
const server = require("../app");
const bcrypt = require("bcryptjs");
const utils = require("./helper/utils");
const Board = require("../models/board");
const User = require("../models/user");
const Task = require("../models/task");
const { ObjectId } = require("mongodb");

const should = chai.should();

chai.use(chaiHttp);

describe('api/board/:boardId/column', function () {
  before(async function () {
    const { token, userId } = await utils.getHeadersConfig({});
    this.authorId = userId;
    this.token = token;
    this.columnId = ObjectId();
    this.columnNameFirst = 'column1';
    this.columnNameChange = 'column2';

    const newBoard = await utils.createBoardWithTaskInColumn({
      userId: this.authorId,
      columnId: this.columnId,
      columnName: this.columnNameFirst
    })

    this.boardId = newBoard._id.toString();
  })
  after(async function () {
    await User.deleteMany();
    await Board.deleteMany();
    await Task.deleteMany();
  })

  context('GET : getBoardColumns : SUCCESS', function () {
    it('should get all columns in Board', function (done) {
      chai.request(server)
        .get(`/api/board/${this.boardId}/column`)
        .set('Authorization', this.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.be.have.property('columns');
          assert.isArray(res.body.columns);
          assert.isAbove(res.body.columns.length, 0);
          done();
        });
    });
  });

  context('PATCH : /:columnId : editColumnName ', function () {
    afterEach(async function () {
      await Board.findOneAndUpdate(
        { _id: this.boardId, "columns._id": this.columnId },
        { $set: { "columns.$.name": this.columnNameFirst } }
      );
    })
    it('should update name of column success', function (done) {
      chai.request(server)
        .patch(`/api/board/${this.boardId}/column/${this.columnId}`)
        .set('Authorization', this.token)
        .send({ 'name': this.columnNameChange })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          Board.findById(this.boardId).then(board => {
            const { columns } = board;
            const isColumn = columns.every(column => {
              return (
                column._id.toString() === this.columnId.toString()
                && column.name === this.columnNameChange
              )
            })
            assert.isTrue(isColumn, ' column name changed success ')
            done();
          })
        });
    });
    it('should return 500 error when have data name not is a string to send',
      function (done) {
        chai.request(server)
          .patch(`/api/board/${this.boardId}/column/${this.columnId}`)
          .set('Authorization', this.token)
          .send({ 'name': [] })
          .end((err, res) => {
            res.should.have.status(500);
            res.should.be.json;
            res.body.should.be.a('object');
            Board.findById(this.boardId).then(board => {
              const { columns } = board;
              const isColumn = columns.every(column => {
                return (
                  column._id.toString() === this.columnId.toString()
                  && column.name === this.columnNameFirst
                )
              })
              assert.isTrue(isColumn, ' column name has not be change');
              done();
            })
          });
      });
  });
});