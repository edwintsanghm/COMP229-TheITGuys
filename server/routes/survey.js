let express = require('express');
let router = express.Router();

let surveyController = require('../controllers/survey');



/* GET Route for the Survey List page - READ Operation */
router.get('/', surveyController.displaySurveyList);


/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', surveyController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.post('/edit/:id',surveyController.processEditPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/:id',surveyController.displaySpecificSurvey);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', surveyController.performDelete);

/** GET Route for responses summary */
router.get('/summary/:id',surveyController.displaySummary);

module.exports = router;
