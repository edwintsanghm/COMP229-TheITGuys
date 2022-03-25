let express = require('express');
let router = express.Router();
var auth = require('./auth');
let surveyController = require('../controllers/survey');

/** POST Route for processing the Add user reponse for first time */
router.post('/:surveyId/add',auth.required,surveyController.processAddUserReponse);

/** post Route for processing the Add user reponse to existing user response */
router.post('/append/:surveyId/add',auth.required,surveyController.processAddSurveyToUserReponse);

module.exports = router;
