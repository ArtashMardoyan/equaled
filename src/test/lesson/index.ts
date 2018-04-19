///<reference path="../../../node_modules/@types/mocha/index.d.ts"/>
'use strict';

import ActivityStep from '../../models/ActivityStep';

process.env.NODE_ENV = 'test';

import * as chaiHttp from 'chai-http';

import Lesson from './../../models/Lesson';
import server from './../../server';

const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

describe('Lesson', () => {
  beforeEach((done) => { // Before each test we empty the database
    Lesson.remove({}, (err) => {
      done();
    });
  });
  /*
    * Test the /GET route
    */
  describe('/GET lessons', () => {
    it('it should GET all the lesson', (done) => {
      chai.request(server)
          .get('/api/lessons')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.docs.should.be.a('array');
            res.body.data.docs.length.should.be.eql(0);
            done();
          });
    });
  });

  describe('/GET/:id lessons', () => {
    it('it should GET a lessons by the given id', (done) => {
      let lesson = new Lesson({
        title: 'test',
        overview: 'test',
        hasCheckList: true,
        checklist: {
          equipment: 'test',
          printOuts: 'test',
          instructions: 'test'
        },
        backgroundInfo: {
          approach: 'test',
          content: 'test',
          standards: ['test', 'test', 'test'],
          competencies: ['test', 'test', 'test']
        }
      });
      lesson.save((err, lesson) => {
        chai.request(server)
            .get('/api/lessons/' + lesson._id)
            .send(lesson)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.have.property('backgroundInfo');
              res.body.data.should.have.property('hasCheckList');
              res.body.data.should.have.property('checklist');
              res.body.data.should.have.property('overview');
              res.body.data.should.have.property('title');
              res.body.data.should.have.property('_id').eql(lesson.id);
              done();
            });
      });
    });
  });

  describe('/POST lesson', () => {
    it('it should not POST a lesson without title overview pages', (done) => {
      const lesson = {
        hasCheckList: true,
        checklist: {
          equipment: 'test',
          printOuts: 'test',
          instructions: 'test'
        },
        backgroundInfo: {
          approach: 'test',
          content: 'test',
          standards: ['test', 'test', 'test'],
          competencies: ['test', 'test', 'test']
        }
      };

      chai.request(server)
          .post('/api/lessons')
          .send(lesson)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.data.should.have.property('error');
            res.body.data.error.should.be.a('array');
            res.body.data.error[0].message.should.have.eql('err required');
            done();
          });
    });

    it('it should POST a lesson ', (done) => {
      const lesson = {
        title: 'test',
        overview: 'test',
        hasCheckList: true,
        checklist: {
          equipment: 'test',
          printOuts: 'test',
          instructions: 'test'
        },
        backgroundInfo: {
          approach: 'test',
          content: 'test',
          standards: ['test', 'test', 'test'],
          competencies: ['test', 'test', 'test']
        }
      };
      chai.request(server)
          .post('/api/lessons')
          .send(lesson)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Created');
            res.body.data.should.have.property('backgroundInfo');
            res.body.data.should.have.property('hasCheckList');
            res.body.data.should.have.property('checklist');
            res.body.data.should.have.property('overview');
            res.body.data.should.have.property('title');
            done();
          });
    });
  });

  describe('/PUT/:id lesson', () => {
    it('it should UPDATE a lesson given the id', (done) => {
      const data = {
        title: 'updated',
        overview: 'test',
        hasCheckList: true,
        checklist: {
          equipment: 'test',
          printOuts: 'test',
          instructions: 'test'
        },
        backgroundInfo: {
          approach: 'test',
          content: 'test',
          standards: ['test', 'test', 'test'],
          competencies: ['test', 'test', 'test']
        },
        phases: ['5ace55b6ea8a4d488b332a4a']
      };
      const lesson = new Lesson(data);
      lesson.save((err, lesson) => {
        chai.request(server)
            .put('/api/lessons/' + lesson.id)
            .send(data)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('name').eql('Ok');
              res.body.data.should.have.property('title').eql('updated');
              done();
            });
      });
    });
  });

  describe('/DELETE/:id lesson', () => {
    it('it should DELETE a lesson given the id', (done) => {
      const lesson = new Lesson({
        title: 'test',
        overview: 'test',
        hasCheckList: true,
        checklist: {
          equipment: 'test',
          printOuts: 'test',
          instructions: 'test'
        },
        backgroundInfo: {
          approach: 'test',
          content: 'test',
          standards: ['test', 'test', 'test'],
          competencies: ['test', 'test', 'test']
        },
        activity: ['5ace55b6ea8a4d488b332a4a']
      });
      lesson.save((err, lesson) => {
        chai.request(server)
            .delete('/api/lessons/' + lesson.id)
            .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.a('object');
              res.body.should.be.eql({});
              done();
            });
      });
    });
  });
});
