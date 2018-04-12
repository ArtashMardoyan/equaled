///<reference path='../../../node_modules/@types/mocha/index.d.ts'/>
'use strict';

process.env.NODE_ENV = 'test';

import * as chaiHttp from 'chai-http';

import LessonActivity from './../../models/LessonActivity';
import server from './../../server';

const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

describe('LessonActivity', () => {
    beforeEach((done) => { // Before each test we empty the database
        LessonActivity.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET lessonActivity', () => {
        it('it should GET all the lessonActivity', (done) => {
            chai.request(server)
                .get('/api/lessonActivities')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.docs.should.be.a('array');
                    res.body.data.docs.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST lessonActivity', () => {
        it('it should not POST a lessonActivity without activityId pages', (done) => {
            const lessonActivity = {
                lessonId: '5ac68569353c8c6e28337635',
                phaseTitle: 'test'
            };
            chai.request(server)
                .post('/api/lessonActivities')
                .send(lessonActivity)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('error');
                    res.body.data.error.should.be.a('array');
                    res.body.data.error[0].message.should.have.eql('err required');
                    done();
                });
        });

        it('it should POST a activity ', (done) => {
            const lessonActivity = {
                activityId: '5ac68e2ae7aeb475b9b829d9',
                lessonId: '5ac68569353c8c6e28337639',
                phaseTitle: 'test'
            };
            chai.request(server)
                .post('/api/lessonActivities')
                .send(lessonActivity)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Created');
                    res.body.data.should.have.property('activityId');
                    res.body.data.should.have.property('lessonId');
                    res.body.data.should.have.property('phaseTitle');
                    done();
                });
        });
    });

    describe('/PUT/:id lessonActivity', () => {
        it('it should UPDATE a lessonActivity given the id', (done) => {
            const data = {
                activityId: '5ac68e2ae7aeb475b9b829d5',
                lessonId: '5ac68569353c8c6e28337635',
                phaseTitle: 'updated'
            };
            const lessonActivity = new LessonActivity(data);
            lessonActivity.save((err, lessonActivity) => {
                chai.request(server)
                    .put('/api/lessonActivities/' + lessonActivity.id)
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql('Ok');
                        res.body.data.should.have.property('phaseTitle').eql('updated');
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id lessonActivity', () => {
        it('it should DELETE a lessonActivity given the id', (done) => {
            const lessonActivity = new LessonActivity({
                activityId: '5ac68e2ae7aeb475b9b829d5',
                lessonId: '5ac68569353c8c6e28337635',
                phaseTitle: 'test3'
            });
            lessonActivity.save((err, lessonActivity) => {
                chai.request(server)
                    .delete('/api/lessonActivities/' + lessonActivity.id)
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
