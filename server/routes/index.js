let express = require('express');
let router = express.Router();

router.use('/api/user',require('./users'));
router.use('/api/survey',require('./survey'));
router.use('/api/response',require('./responses'));

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

module.exports = router;
