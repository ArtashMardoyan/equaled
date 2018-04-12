///<reference path='../../../node_modules/@types/mocha/index.d.ts'/>
'use strict';

process.env.NODE_ENV = 'test';

import * as chaiHttp from 'chai-http';

import Phase from './../../models/Phase';
import server from './../../server';

const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

describe('Phase', () => {
    beforeEach((done) => { // Before each test we empty the database
        Phase.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET phase', () => {
        it('it should GET all the phase', (done) => {
            chai.request(server)
                .get('/api/phases')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.docs.should.be.a('array');
                    res.body.data.docs.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST phase', () => {
        it('it should not POST a phase without name page', (done) => {
            const phase = {
                description: 'test',
                duration: 123,
                activities: ['5ace55b6ea8a4d488b332a4a']
            };
            chai.request(server)
                .post('/api/phases')
                .send(phase)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('error');
                    res.body.data.error.should.be.a('array');
                    res.body.data.error[0].message.should.have.eql('err required');
                    done();
                });
        });

        it('it should POST a phase ', (done) => {
            const phase = {
                name: 'test',
                description: 'test',
                duration: 123,
                activities: ['5ace55b6ea8a4d488b332a4a']
            };
            chai.request(server)
                .post('/api/phases')
                .send(phase)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Created');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('description');
                    res.body.data.should.have.property('duration');
                    res.body.data.should.have.property('activities');
                    done();
                });
        });
    });

    describe('/PUT/:id phase', () => {
        it('it should UPDATE a phase given the id', (done) => {
            const data = {
                name: 'test',
                description: 'test',
                duration: 123,
                activities: ['5ace55b6ea8a4d488b332a4a']
            };
            const phase = new Phase(data);
            phase.save((err, phase) => {
                chai.request(server)
                    .put('/api/phases/' + phase.id)
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql('Ok');
                        res.body.data.should.have.property('name').eql('test');
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id phase', () => {
        it('it should DELETE a phase given the id', (done) => {
            const phase = new Phase({
                name: 'test',
                description: 'test',
                duration: 123,
                activities: ['5ace55b6ea8a4d488b332a4a']
            });
            phase.save((err, phase) => {
                chai.request(server)
                    .delete('/api/phases/' + phase.id)
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
