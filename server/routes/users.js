var express = require('express');
var router = express.Router();
var indexController = require('../controllers/');
let cors = require('cors');

/* GET users listing. */

// /* POST Route for processing the Login page */
router.post('/login', cors(), indexController.processLoginPage);

// /* POST Route for processing the Register page */
router.post('/register', cors(), indexController.processRegisterPage);

// /* GET to perform UserLogout */
router.get('/logout', cors() ,indexController.performLogout);

module.exports = router;
