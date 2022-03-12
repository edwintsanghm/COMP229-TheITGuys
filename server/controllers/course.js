// create a reference to the model
let Course = require('../models/course');

module.exports.displayCourseList = (req, res, next) => {
    Course.find((err, courseList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('course/list', 
            {title: 'Course', 
            courseList: courseList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('course/add', {title: 'Add Course', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newCourse = Course({
        "name": req.body.name,
        "code": req.body.code,
        "lecture_per_week": req.body.lecture_per_week,
        "description": req.body.description,
        "lab_per_week": req.body.lab_per_week,
        "availability":req.body.availability,
        "description": req.body.description,
    });

    Course.create(newCourse, (err, course) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/courses');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Course.findById(id, (err, courseToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('course/edit', {title: 'Edit Course', course: courseToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedCourse = Course({
        "_id": id,
        "name": req.body.name,
        "code": req.body.code,
        "lecture_per_week": req.body.lecture_per_week,
        "description": req.body.description,
        "lab_per_week": req.body.lab_per_week,
        "availability":req.body.availability,
        "description": req.body.description,
    });

    Course.updateOne({_id: id}, updatedCourse, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/courses');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Course.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/courses');
        }
    });
}