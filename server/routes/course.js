let express = require('express');
let router = express.Router();

let courseController = require('../controllers/course');

// helper function for guard purposes
// function requireAuth(req, res, next)
// {
//     // check if the user is logged in
//     if(!req.isAuthenticated())
//     {
//         return res.redirect('/login');
//     }
//     next();
// }

/* GET Route for the Course List page - READ Operation */
router.get('/', courseController.displayCourseList);

// /* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', courseController.displayAddPage);

// /* POST Route for processing the Add page - CREATE Operation */
router.post('/add', courseController.processAddPage);

// /* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id',courseController.displayEditPage);

// /* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', courseController.processEditPage);

// /* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', courseController.performDelete);

module.exports = router;