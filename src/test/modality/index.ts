///<reference path='../../../node_modules/@types/mocha/index.d.ts'/>
'use strict';

import Lesson from '../../models/Lesson';

process.env.NODE_ENV = 'test';

import * as chaiHttp from 'chai-http';

import Modality from './../../models/Modality';
import server from './../../server';

const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

describe('Modality', () => {
  beforeEach((done) => { // Before each test we empty the database
    Modality.remove({}, (err) => {
      done();
    });
  });
  /*
    * Test the /GET route
    */
  describe('/GET modality', () => {
    it('it should GET all the modality', (done) => {
      chai.request(server)
          .get('/api/modalities')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.docs.should.be.a('array');
            res.body.data.docs.length.should.be.eql(0);
            done();
          });
    });
  });

  describe('/GET/:id modality', () => {
    it('it should GET a modality by the given id', (done) => {
      let modality = new Modality({
        type: 'individual',
        say: 'test',
        ask: 'test',
        discuss: 'test'
      });
      modality.save((err, modality) => {
        chai.request(server)
            .get('/api/modalities/' + modality._id)
            .send(modality)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.have.property('type');
              res.body.data.should.have.property('say');
              res.body.data.should.have.property('ask');
              res.body.data.should.have.property('discuss');
              res.body.data.should.have.property('_id').eql(modality.id);
              done();
            });
      });
    });
  });

  describe('/POST modality', () => {
    it('it should not POST a modality without say page', (done) => {
      const modality = {
        type: 'groups',
        ask: 'test',
        discuss: 'test'
      };
      chai.request(server)
          .post('/api/modalities')
          .send(modality)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.data.should.have.property('error');
            res.body.data.error.should.be.a('array');
            res.body.data.error[0].message.should.have.eql('err required');
            done();
          });
    });

    it('it should POST a modality ', (done) => {
      const modality = {
        type: 'groups',
        say: 'test',
        ask: 'test',
        discuss: 'test'
      };
      chai.request(server)
          .post('/api/modalities')
          .send(modality)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Created');
            res.body.data.should.have.property('type');
            res.body.data.should.have.property('say');
            res.body.data.should.have.property('ask');
            res.body.data.should.have.property('discuss');
            done();
          });
    });
  });

  describe('/PUT/:id modality', () => {
    it('it should UPDATE a modality given the id', (done) => {
      const data = {
        type: 'individual',
        say: 'test',
        ask: 'test',
        discuss: 'test'
      };
      const modality = new Modality(data);
      modality.save((err, modality) => {
        chai.request(server)
            .put('/api/modalities/' + modality.id)
            .send(data)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('name').eql('Ok');
              res.body.data.should.have.property('type').eql('individual');
              done();
            });
      });
    });
  });

  describe('/DELETE/:id modality', () => {
    it('it should DELETE a modality given the id', (done) => {
      const modality = new Modality({
        type: 'whole_class',
        say: 'test',
        ask: 'test',
        discuss: 'test'
      });
      modality.save((err, modality) => {
        chai.request(server)
            .delete('/api/modalities/' + modality.id)
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
