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
    if(!req.body.user.email){
        return res.status(422).json({errors: {email: "can't be blank"}});
      }
    
      if(!req.body.user.password){
        return res.status(422).json({errors: {password: "can't be blank"}});
      }
    
      passport.authenticate('local', {session: false}, function(err, user, info){
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
    var user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);

    user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
      }).catch(next);
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
}