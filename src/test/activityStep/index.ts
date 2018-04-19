///<reference path="../../../node_modules/@types/mocha/index.d.ts"/>
'use strict';

import Activity from '../../models/Activity';

process.env.NODE_ENV = 'test';

import * as chaiHttp from 'chai-http';

import ActivityStep from './../../models/ActivityStep';
import server from './../../server';

const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

describe('ActivityStep', () => {
  beforeEach((done) => { // Before each test we empty the database
    ActivityStep.remove({}, (err) => {
      done();
    });
  });
  /*
    * Test the /GET route
    */
  describe('/GET activityStep', () => {
    it('it should GET all the activityStep', (done) => {
      chai.request(server)
          .get('/api/activityStep')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.docs.should.be.a('array');
            res.body.data.docs.length.should.be.eql(0);
            done();
          });
    });
  });

  describe('/GET/:id activityStep', () => {
    it('it should GET a activityStep by the given id', (done) => {
      let activityStep = new ActivityStep({
        title: 'updated',
        intro: 'test1',
        studentInstruction: 'test1',
        type: 'slide',
        contentRef: 'test',
        defaultModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        alternativeModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        teacherTips: [234, 567],
        misconceptions: 'test',
        questions: 'test',
        answers: '12345',
        vocabularyWords: 'test',
        skills: 'test',
        vocabularyRef: 123,
        contentType: 'video',
        teacherGuide: {
          phase: 'test1',
          duration: 10,
          additionalInfo: 'test',
          commonQuestions: ['test']
        }
      });
      activityStep.save((err, activity) => {
        chai.request(server)
            .get('/api/activityStep/' + activity._id)
            .send(activity)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.have.property('alternativeModality');
              res.body.data.should.have.property('studentInstruction');
              res.body.data.should.have.property('defaultModality');
              res.body.data.should.have.property('vocabularyWords');
              res.body.data.should.have.property('misconceptions');
              res.body.data.should.have.property('vocabularyRef');
              res.body.data.should.have.property('teacherGuide');
              res.body.data.should.have.property('contentType');
              res.body.data.should.have.property('teacherTips');
              res.body.data.should.have.property('contentRef');
              res.body.data.should.have.property('questions');
              res.body.data.should.have.property('answers');
              res.body.data.should.have.property('skills');
              res.body.data.should.have.property('intro');
              res.body.data.should.have.property('title');
              res.body.data.should.have.property('type');
              res.body.data.should.have.property('_id').eql(activity.id);
              done();
            });
      });
    });
  });

  describe('/POST activityStep', () => {
    it('it should not POST a activityStep without title overview pages', (done) => {
      const activityStep = {
        intro: 'test',
        studentInstruction: 'test',
        type: 'slide',
        contentRef: 'test',
        defaultModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        alternativeModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        teacherTips: [123, 123],
        misconceptions: 'test',
        questions: 'test',
        answers: '12345',
        vocabularyWords: 'test',
        skills: 'test',
        vocabularyRef: 345,
        contentType: 'video',
        teacherGuide: {
          phase: 'test1',
          duration: 10,
          additionalInfo: 'test',
          commonQuestions: ['test']
        }
      };
      chai.request(server)
          .post('/api/activityStep')
          .send(activityStep)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.data.should.have.property('error');
            res.body.data.error.should.be.a('array');
            res.body.data.error[0].message.should.have.eql('err required');
            done();
          });
    });

    it('it should POST a activityStep ', (done) => {
      const activityStep = {
        title: 'test',
        intro: 'test',
        studentInstruction: 'test',
        type: 'slide',
        contentRef: 'test',
        defaultModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        alternativeModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        teacherTips: [123, 123],
        misconceptions: 'test',
        questions: 'test',
        answers: '12345',
        vocabularyWords: 'test',
        skills: 'test',
        vocabularyRef: 345,
        contentType: 'video',
        teacherGuide: {
          phase: 'test1',
          duration: 10,
          additionalInfo: 'test',
          commonQuestions: ['test']
        }
      };
      chai.request(server)
          .post('/api/activityStep')
          .send(activityStep)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Created');
            res.body.data.should.have.property('alternativeModality');
            res.body.data.should.have.property('studentInstruction');
            res.body.data.should.have.property('defaultModality');
            res.body.data.should.have.property('vocabularyWords');
            res.body.data.should.have.property('misconceptions');
            res.body.data.should.have.property('vocabularyRef');
            res.body.data.should.have.property('teacherGuide');
            res.body.data.should.have.property('contentType');
            res.body.data.should.have.property('teacherTips');
            res.body.data.should.have.property('contentRef');
            res.body.data.should.have.property('questions');
            res.body.data.should.have.property('answers');
            res.body.data.should.have.property('skills');
            res.body.data.should.have.property('intro');
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('type');
            done();
          });
    });
  });

  describe('/PUT/:id activityStep', () => {
    it('it should UPDATE a activityStep given the id', (done) => {
      const data = {
        title: 'updated',
        intro: 'test1',
        studentInstruction: 'test1',
        type: 'slide',
        contentRef: 'test',
        defaultModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        alternativeModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        teacherTips: [234, 567],
        misconceptions: 'test',
        questions: 'test',
        answers: '12345',
        vocabularyWords: 'test',
        skills: 'test',
        vocabularyRef: 123,
        contentType: 'video',
        teacherGuide: {
          phase: 'test1',
          duration: 10,
          additionalInfo: 'test',
          commonQuestions: ['test']
        }
      };
      const activityStep = new ActivityStep(data);
      activityStep.save((err, activityStep) => {
        chai.request(server)
            .put('/api/activityStep/' + activityStep.id)
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

  describe('/DELETE/:id activityStep', () => {
    it('it should DELETE a activityStep given the id', (done) => {
      const activityStep = new ActivityStep({
        title: 'updated',
        intro: 'updated',
        studentInstruction: 'test1',
        type: 'slide',
        contentRef: 'test',
        defaultModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        alternativeModality: {
          _id: '5ac8fda5c8f1f72190e53bbe'
        },
        teacherTips: [234, 567],
        misconceptions: 'updated',
        questions: 'test',
        answers: '12345',
        vocabularyWords: 'test',
        skills: 'test',
        vocabularyRef: 123,
        contentType: 'video',
        teacherGuide: {
          phase: 'test1',
          duration: 10,
          additionalInfo: 'test',
          commonQuestions: ['test']
        }
      });
      activityStep.save((err, activityStep) => {
        chai.request(server)
            .delete('/api/activityStep/' + activityStep.id)
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
