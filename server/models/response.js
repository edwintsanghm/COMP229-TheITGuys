let mongoose = require('mongoose');

// create a model class
let responseModel = mongoose.Schema({
    survey:[{
        type:mongoose.Schema.ObjectId,
        ref:"Survey"
    }],
    totalResponse:Number,
    questions:[{
        type:mongoose.Schema.ObjectId,
        ref:"Question"
    }],
},
{
    collection: "response"
});

module.exports = mongoose.model('Response', responseModel);