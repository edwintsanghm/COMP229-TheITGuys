const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server/config/app')

describe('Unit tests for CRUD operations on different end points', () => {
    it('ok, created a new survey', (done) => {
        request(app)
        .post('/api/survey/add')
        .send({
            "name":"Test survey",
            "description":"description",
            "questions":[{"title":"q1","qtype":"MC","options":["A","B","C","D"],"selectedOption":"B"}]
        
        })
        .then((res) => {
            const body = res.body;
            expect(body.survey).to.contain.property('_id');
            done();
        })
        .catch((err) => done(err));
    });
    
});