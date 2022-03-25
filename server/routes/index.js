let express = require('express');
let router = express.Router();

router.use('/api/user',require('./users'));
router.use('/api/survey',require('./survey'));

router.use(function(err, req, res, next){
    if(err.name === 'ValidationError'){
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce(function(errors, key){
          errors[key] = err.errors[key].message;
  
          return errors;
        }, {})
      });
    }
  
    return next(err);
  });

// let indexController = require('../controllers/index');

// /* GET home page. */
// router.get('/', indexController.displayHomePage);

// /* GET home page. */
// router.get('/home', indexController.displayHomePage);

// /* GET About Us page. */
// router.get('/about', indexController.displayAboutPage);

// /* GET Products page. */
// router.get('/products', indexController.displayProductsPage);

// /* GET Services page. */
// router.get('/services', indexController.displayServicesPage);

// /* GET Contact Us page. */
// router.get('/contact', indexController.displayContactPage);

// /* GET Route for displaying the Login page */
// router.get('/login', indexController.displayLoginPage);

// /* POST Route for processing the Login page */
// router.post('/login', indexController.processLoginPage);

// /* GET Route for displaying the Register page */
// router.get('/register', indexController.displayRegisterPage);

// /* POST Route for processing the Register page */
// router.post('/register', indexController.processRegisterPage);

// /* GET to perform UserLogout */
// router.get('/logout', indexController.performLogout);

module.exports = router;
