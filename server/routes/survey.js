let express = require('express');
let router = express.Router();

let surveyController = require('../controllers/survey');



/* GET Route for the Survey List page - READ Operation */
router.get('/', surveyController.displaySurveyList);


/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', surveyController.processAddPage);


module.exports = router;
