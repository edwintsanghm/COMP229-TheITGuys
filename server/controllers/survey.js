const e = require('connect-flash');
let survey = require('../models/survey');
let UserResponse = survey.UserResponse;
let Survey = survey.Survey;
let Question = survey.Question;
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
        let newSurvey = await Survey({
            "name": req.body.name,
            "description": req.body.description,
            // "owner": req.body.ownerId,
            "questions": req.body.questions,
        });

        console.log('newSurvey', newSurvey)

        let createdSurvey = await Survey.create(newSurvey);

        res.json({
                survey: createdSurvey,
                // responses: createResponses || findedUserResponse,
        });
    } catch (e) {
        res.json({
            error: e
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
        let responses = await UserResponse
            .findById(id)
            .populate('survey')
            .exec();

        res.json({
            responses
        })
    } catch (e) {
        console.error(e);
        res.json({
            error: e
        })
    }

}