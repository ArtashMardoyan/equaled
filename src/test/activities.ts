///<reference path='../../node_modules/@types/mocha/index.d.ts'/>
'use strict';

process.env.NODE_ENV = 'test';

import * as chaiHttp from 'chai-http';

import Activities from '../models/Activities';
import server from '../server';

const chai = require('chai');
const should = chai.should();

chai.use(chaiHttp);

describe('Activities', () => {
    beforeEach((done) => { // Before each test we empty the database
        Activities.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET activities', () => {
        it('it should GET all the activities', (done) => {
            chai.request(server)
                .get('/api/activities')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.docs.should.be.a('array');
                    res.body.data.docs.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST activities', () => {
        it('it should not POST a activities without title overview pages', (done) => {
            const activities = {
                shortDescription: 'test',
                objectives: 'test',
                duration: 12345,
                competencies: 'test',
                templateType: 'content',
                modality: 'groups'
            };
            chai.request(server)
                .post('/api/activities')
                .send(activities)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('error');
                    res.body.data.error.should.be.a('array');
                    res.body.data.error[0].message.should.have.eql('err required');
                    done();
                });
        });

        it('it should POST a activities ', (done) => {
            const activities = {
                title: 'test',
                shortDescription: 'test',
                objectives: 'test',
                duration: 12345,
                competencies: 'test',
                templateType: 'content',
                modality: 'groups'
            };
            chai.request(server)
                .post('/api/activities')
                .send(activities)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Created');
                    res.body.data.should.have.property('shortDescription');
                    res.body.data.should.have.property('templateType');
                    res.body.data.should.have.property('competencies');
                    res.body.data.should.have.property('objectives');
                    res.body.data.should.have.property('duration');
                    res.body.data.should.have.property('modality');
                    res.body.data.should.have.property('title');
                    done();
                });
        });
    });

    describe('/PUT/:id activities', () => {
        it('it should UPDATE a activities given the id', (done) => {
            const activities = new Activities({
                title: 'test',
                shortDescription: 'test',
                objectives: 'test',
                duration: 12345,
                competencies: 'test',
                templateType: 'content',
                modality: 'groups'
            });
            activities.save((err, activities) => {
                chai.request(server)
                    .put('/api/activities/' + activities.id)
                    .send({
                        title: 'test',
                        shortDescription: 'test',
                        objectives: 'test',
                        duration: 12345,
                        competencies: 'test',
                        templateType: 'content',
                        modality: 'pairs'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql('Ok');
                        res.body.data.should.have.property('modality').eql('pairs');
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id activities', () => {
        it('it should DELETE a activities given the id', (done) => {
            const activities = new Activities({
                title: 'test',
                shortDescription: 'test',
                objectives: 'test',
                duration: 12345,
                competencies: 'test',
                templateType: 'content',
                modality: 'groups'
            });
            activities.save((err, activities) => {
                chai.request(server)
                    .delete('/api/activities/' + activities.id)
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
