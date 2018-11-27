const express = require('express');
const router = express.Router();
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let itemsModel = require('../models/Post.js');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);


describe('Posts', () => {
  // Removes anything from the db before the tests are run
  beforeEach((done) => {
    Post.remove({}, (err) => {
      done();
    });
  });
  // Goes to the database and should not find anything in there
  describe('/GET posts', () => {
      it('it should GET all items from db', (done) => {
        chai.request(server)
            .get('/api/posts')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST posts', () => {
    it('it should add a post to the db', (done) => {
      let post = {
        title: "Test",
        message: "This is a test message",
        user: "Mr Test"
      }
      chai.request(server)
      .post('/api/posts')
      .send(post)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.title).to.equal('Test');
        expect(res.body.message).to.equal('This is a test message');
        expect(res.body.user).to.equal('Mr Test');
        this.id = res.body._id
        console.log(this.id);
      done();
      });
    });
  });
});

describe('/DELETE/:id post', () => {
  it('it should delete a post in the db', (done) => {
    chai.request(server)
    .delete('/api/posts/' + this.id)
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.body.success).to.equal(true);
      done()
    });
  });
});
