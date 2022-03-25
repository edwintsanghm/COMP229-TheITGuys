var express = require('express');
var router = express.Router();
var indexController = require('../controllers/');

/* GET users listing. */

// /* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

// /* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

// /* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
