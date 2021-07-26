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

describe('api/board/:boardId/task/:taskId', function () {
  before(async function () {
    const { token, userId } = await utils.getHeadersConfig({});
    this.authorId = userId;
    this.token = token;
    this.nameTask = 'Task1';
    const { taskId, boardId, columnId } = await utils.createNewTask(
      { name: this.nameTask, userId }
    )
    this.boardId = boardId.toString();
    this.taskId = taskId;
  })
  after(async function () {
    await User.deleteMany();
    await Board.deleteMany();
    await Task.deleteMany();
  })
  context('GET : getTaskbyId : SUCCESS', function () {
    it('should get all Task in Board', function (done) {
      chai.request(server)
        .get(`/api/board/${this.boardId}/task/${this.taskId}`)
        .set('Authorization', this.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.be.have.property('task');
          assert.equal(res.body.task.title, this.nameTask);
          assert.equal(res.body.task.author._id, this.authorId);
          done();
        });
    });
  });

  context('PATCH : updateTask : SUCCESS ', function () {
    beforeEach(async function () {
      this.nameTaskUpdate = 'TaskUpdateName';
      this.descriptionTaskUpdate = 'TaskUpdateTitle';
    })
    it('should update task success', function (done) {
      chai.request(server)
        .post(`/api/board/${this.boardId}/task/${this.taskId}`)
        .set('Authorization', this.token)
        .send({
          'title': this.nameTaskUpdate,
          'description': this.descriptionTaskUpdate
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          Task.findById(this.taskId).then(task => {
            assert.equal(task.title, this.nameTaskUpdate);
            assert.equal(task.description, this.descriptionTaskUpdate);
            done();
          })
        });
    });
  });
});