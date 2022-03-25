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
        
        
        // let findedUserResponse = await UserResponse.findOne({ name: req.body.name });
        // let createResponses = null;
        // console.log('response', findedUserResponse, createdSurvey);
        // //if user response exist
        // if (findedUserResponse != null) {
        //     let questions = req.body.questions;
        //     for(let i = 0;i < findedUserResponse.summary.length;i++) {
        //         if(questions[i].title == findedUserResponse.summary[i].qtitle) {
        //             let updatedValues = findedUserResponse.summary[i].stat[questions[i].selectedOption] + 1;
        //             findedUserResponse.summary[i].stat[questions[i].selectedOption] = updatedValues;
        //         }
        //     }
        //     findedUserResponse.survey = [...findedUserResponse.survey, createdSurvey._id];
        //     findedUserResponse.markModified('summary');
        //     findedUserResponse.save();
        // } else {
        //     // create summary object like..
        //     // {
        //     //     qtitle:question1    
        //     //     stat:{
        //     //         optionA:0,
        //     //         optionB:1,
        //     //     }
        //     // }

        //     console.log();
        //     let questions = createdSurvey.questions;
        //     questionSummary = questions.map(question => {
        //         // let selected = question.selectedOption;
        //         let options = question.choices;
        //         let title = question.title;
        //         const obj = {};
        //         options.forEach(o => {
        //             obj[o] = 0;
        //             if(o == selected) {
        //                 obj[o] = 1;
        //             } else {
        //                 obj[o] = 0;
        //             }
        //         });
        //         return {
        //             qtitle:title,
        //             stat:obj
        //         }
        //     });
        //     //if user response does not exist, create a new response for it    
        //     let newUserResponse = UserResponse({
        //         name: createdSurvey.name,
        //         survey: [createdSurvey._id],
        //         summary: questionSummary
        //     });
        //     createResponses = await UserResponse.create(newUserResponse);
        // }

        // res.json({
        //     survey: createdSurvey,
        //     responses: createResponses || findedUserResponse,
        // });

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