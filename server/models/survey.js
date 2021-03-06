let mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// create a model class
let questionSchema = mongoose.Schema(
    {
        title: String,
        //MC,Agree/Disagree/ShortQuestion
        type: String,
        choices: [String],
        selectedOption: String,
    },
    {
        collection: "question"
    }
);


// create a model class
let surveySchema = mongoose.Schema({
    name: String,
    description: String,
    //no use for now
    // owner: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User"
    // },
    questions: [questionSchema]
},
    {
        collection: "survey"
    });
let userResponseSchema = mongoose.Schema(
    {
        name: { type: String, unique: true },
        survey: [{
            type: mongoose.Schema.ObjectId,
            ref: "Survey",
        }],
        summary:Object
    },
    {
        collection: "response"
    });
userResponseSchema.plugin(uniqueValidator, { message: 'is already taken.' });
module.exports = {
    Survey: mongoose.model('Survey', surveySchema),
    Question: mongoose.model('Question', questionSchema),
    UserResponse: mongoose.model('UserReponses', userResponseSchema)
}