let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    // res.render('index', {title: 'CentHub', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    // res.render('index', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProductsPage = (req, res, next) => {
    // res.render('index', { title: 'Products', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    // res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    // res.render('index', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        // res.render('auth/login', 
        // {
        //    title: "Login",
        //    messages: req.flash('loginMessage'),
        //    displayName: req.user ? req.user.displayName : '' 
        // })
    }
    else {
        // return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {

    console.log('123', req.body)
    if(!req.body.username){
        return res.status(422).json({errors: {username: "can't be blank"}});
      }
    
      if(!req.body.password){
        return res.status(422).json({errors: {password: "can't be blank"}});
      }

    
      passport.authenticate('local', {session: false}, function(err, user, info){
          console.log(err, user, info)
        if(err){ return next(err); }
    
        if(user){
          user.token = user.generateJWT();
          return res.json({user: user.toAuthJSON()});
        } else {
          return res.status(422).json(info);
        }
      })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) {
        // res.render('auth/register',
        // {
        //     title: 'Register',
        //     messages: req.flash('registerMessage'),
        //     displayName: req.user ? req.user.displayName : ''
        // });
    }
    else {
        // return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    console.log(req.body)
    var user = new User();

    user.username = req.body.username;
    user.email = req.body.username;
    user.setPassword(req.body.password);

    user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
      }).catch((err) => {
          return res.json({error:err });
      });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
}