let express = require('express');
let router = express.Router();
var auth = require('./auth');
let surveyController = require('../controllers/survey');
let cors = require('cors');

// TODO: comment out auth for development
/* GET Route for the Survey List page - READ Operation */
// router.get('/',auth.required,surveyController.displaySurveyList);

// /* POST Route for processing the Add page - CREATE Operation */
// router.post('/add',auth.required, surveyController.processAddPage);

// /* GET Route for displaying the Edit page - UPDATE Operation */
// router.post('/edit/:id',auth.required,surveyController.processEditPage);

// /* GET Route for displaying the Edit page - UPDATE Operation */
// router.get('/:id',auth.required,surveyController.displaySpecificSurvey);

// /* GET to perform  Deletion - DELETE Operation */
// router.get('/delete/:id',auth.required, surveyController.performDelete);

// /** GET Route for responses summary */
// router.get('/summary/:id',auth.required,surveyController.displaySummary);

router.get('/', cors(), surveyController.displaySurveyList);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', cors(),auth.required,surveyController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.post('/edit/:id',cors(),auth.required,surveyController.processEditPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/:id',cors(), surveyController.displaySpecificSurvey);

router.post('/respond/:surveyId',cors(), surveyController.processAddSurveyToUserReponse);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', cors(), auth.required, surveyController.performDelete);

/** GET Route for responses summary */
router.get('/summary/:id',cors(), auth.required, surveyController.displaySummary);

module.exports = router;
