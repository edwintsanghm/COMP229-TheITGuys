let mongoose = require('mongoose');

// create a model class
let questionModel = mongoose.Schema({
    title: String,
    //MC,Agree/Disagree/ShortQuestion
    type: String,
    options: [String],
    selectedOption: String,
},
    {
        collection: "question"
    });

module.exports = mongoose.model('Question', questionModel);