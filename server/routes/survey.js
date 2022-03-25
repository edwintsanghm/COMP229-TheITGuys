let express = require('express');
let router = express.Router();
var auth = require('./auth');
let surveyController = require('../controllers/survey');

/* GET Route for the Survey List page - READ Operation */
router.get('/',auth.required,surveyController.displaySurveyList);


/* POST Route for processing the Add page - CREATE Operation */
router.post('/add',auth.required, surveyController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.post('/edit/:id',auth.required,surveyController.processEditPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/:id',auth.required,surveyController.displaySpecificSurvey);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id',auth.required, surveyController.performDelete);

/** GET Route for responses summary */
router.get('/summary/:id',auth.required,surveyController.displaySummary);

module.exports = router;
