let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    description: String,
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    questions:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Question"
        }
    ]
},
{
    collection: "survey"
});

module.exports = mongoose.model('Survey', surveyModel);