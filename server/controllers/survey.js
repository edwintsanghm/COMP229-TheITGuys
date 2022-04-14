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
            survey: createdSurvey
        });
    } catch (e) {
        res.json({
            error: e
        })
    }

}

/**
 * if there is no user response for the survey.
 * @param {created survey's _id, survey name, survey questions array} req 
 * @param {created user response} res 
 * @param {*} next 
 */
module.exports.processAddUserReponse = async (req, res, next) => {

    console.log('first time');
    let name = req.body.name;
    let surveyId = req.params.surveyId;
    let questions = req.body.questions;
    questionSummary = questions.map(question => {
        let selected = question.selectedOption;
        let options = question.choices;
        let title = question.title;
        const obj = {};
        options.forEach(o => {
            obj[o] = 0;
            if (o == selected) {
                obj[o] = 1;
            } else {
                obj[o] = 0;
            }
        });
        return {
            title: title,
            stat: obj
        }
    });

    let newUserResponse = UserResponse({
        name: name,
        survey: [surveyId],
        summary: questionSummary
    });
    let createResponses = await UserResponse.create(newUserResponse);
    return res.json({
        userResponse: createResponses
    });
}

/**
 * Append survey to the user response.
 * @param {created survey's id,created survey's name, survey's questions} req 
 * @param {created user response} res 
 * @param {*} next 
 */
module.exports.processAddSurveyToUserReponse = async (req, res, next) => {
    console.log('for update', req.params.surveyId);
    let surveyId = req.params.surveyId;
    let questions = req.body.questions;
    let name = req.body.name;
    let findedUserResponse = await UserResponse.findOne({ name: name });
    if (findedUserResponse != null) {
        for (let i = 0; i < findedUserResponse.summary.length; i++) {
            if (questions[i].title == findedUserResponse.summary[i].title) {
                findedUserResponse.summary[i].stat[questions[i].selectedOption] = findedUserResponse.summary[i].stat[questions[i].selectedOption] + 1;
            }
        }

        findedUserResponse.survey = [...findedUserResponse.survey, surveyId];
        findedUserResponse.markModified('summary');
        findedUserResponse.save();
        return res.json({
            userReponse:findedUserResponse
        })
    } else {

        return this.processAddUserReponse(req, res, next);
        // return res.status(422).json({
        //     "error":`cannot find user response with the name - ${name}`
        // });
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
        let newSurvey = await Survey.findById(id);
        let findedUserResponse = await UserResponse.findOne({ name: newSurvey.name }).populate('survey').exec();
        /*
        let responses = await UserResponse.aggregate(

        )
            .populate('survey')
            .exec();
*/
        res.json({
            findedUserResponse
        })
    } catch (e) {
        console.error(e);
        res.json({
            error: e
        })
    }

}