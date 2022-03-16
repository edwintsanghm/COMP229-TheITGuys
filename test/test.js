const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server/config/app')
let surveyId = 0;


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
            surveyId = body.survey._id;
            expect(body.survey).to.contain.property('_id');
            done();
        })
        .catch((err) => done(err));
    });


    it('ok,get survey list',(done) => {
        request(app)
        .get('/api/survey')
        .then((res) => {
            const surveys = res.body.surveyList;
            expect(surveys).to.be.an('array');
            expect(surveys[0]).to.contain.property('_id');
            done();
        })
        .catch((err) => done(err))
        ;
        
    });

    it('ok,update survey object',(done) => {
        request(app)
        .post(`/api/survey/edit/${surveyId}`)
        .send({
            "name":"Test survey222222",
            "description":"description",
            "questions":[{"title":"q1sdkjfsdhoifjds","qtype":"MC","options":["Asadasdas","Bsadasdas","Cccsdasdq","Dasdsadasdas"],"selectedOption":"Bsadasdas"}]
        
        })
        .then((res) => {
            const survey = res.body.survey;
            expect(res.body).to.contain.property('survey');
            expect(survey).to.contain.property('modifiedCount');
            done();
        })
        .catch((err) => done(err));
    });

    it('ok,get survey object',(done) => {
        request(app)
        .get(`/api/survey/${surveyId}`)
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('survey');
            expect(body.survey).to.contain.property('_id');
            done();
        })
        .catch((err) => done(err))
        ;
    });

    it('ok,delete survey object', (done) => {
        request(app)
        .get(`/api/survey/delete/${surveyId}`)
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('survey');
            expect(body.survey).to.contain.property('deletedCount');
            expect(body.survey.deletedCount).to.equal(1);
            done();
        })
        .catch((err) => done(err));
    });

});