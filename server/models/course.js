let mongoose = require('mongoose');

// create a model class
let courseModel = mongoose.Schema({
    name: String,
    code: String,
    lecture_per_week: Number,
    lab_per_week: Number,
    description: String,
    availability: String
},
{
    collection: "courses"
});

module.exports = mongoose.model('Course', courseModel);