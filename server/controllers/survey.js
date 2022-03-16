const e = require('connect-flash');
let survey = require('../models/survey');
let UserResponse = survey.UserResponse;
let Survey = survey.Survey;
module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveys) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json({
                surveyList: surveys
                // abc:'ahsudhusa'
            });
        }
    });
}

module.exports.processAddPage = async (req, res, next) => {
    try {
        let newSurvey = Survey({
            "name": req.body.name,
            "description": req.body.description,
            // "owner": req.body.ownerId,
            "questions": req.body.questions
        });
    
        let createdSurvey = await Survey.create(newSurvey);
        let findedUserResponse = await UserResponse.findOne({ name: req.body.name });
        let createResponses = null;
        //if user response exist
        if (findedUserResponse != null) {
            findedUserResponse.survey = [...findedUserResponse.survey, createdSurvey._id];
            findedUserResponse.save();
        } else {
        //if user response does not exist, create a new response for it    
            let newUserResponse = UserResponse({
                name:createdSurvey.name,
                survey: [createdSurvey._id],
                questions: [createdSurvey.questions.map((question) => question._id)]
            });
            createResponses = await UserResponse.create(newUserResponse);
        }
    
        res.json({
            survey: createdSurvey,
            responses:createResponses,
        });
    } catch(e) {
        res.json({
            error:e
        })
    }

}

module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.body.questions);

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "description": req.body.description,
        // "owner": req.body.ownerId,
        "questions": req.body.questions,
    });

    Survey.updateOne({ _id: id }, updatedSurvey, (err, data) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({
                survey: data
            });
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({
                survey: data
            });
        }
    });
}

module.exports.displaySpecificSurvey = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({
                survey: survey
            });
        }
    });
}

module.exports.displaySummary = async (req, res, next) => {
    try {
        let id = req.params.id;
        let responses = await UserResponse.findById(id).populate('survey').exec();
        res.json({
            summary:responses,
        })
    }catch(e) {
        res.json({
            error:e
        })
    }

}