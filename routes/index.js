var express = require('express');
var router = express.Router();
var xml2js = require("xml2js");
var request = require('request');
var User = require('../models/user');

var parser = new xml2js.Parser();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
};

module.exports = function(passport){

    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { message: req.flash('message'), title: 'rss aggregator' });
    });

  /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash : true
    }));


  /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash : true
    }));

    /* Handle Update user userChannel POST */
    router.post('/update', isAuthenticated, function(req, res){
        User.findOne({ username: req.body.user.username }, function (err, user){
            user.userChannel = req.body.user.userChannel || user.userChannel;
            user.save();
        });
    });

  /* GET Home Page */
    router.post('/home', isAuthenticated, function(req, res){
        res.json({ user: req.user  });
    });

  /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

   /* Get feed url & data XML*/
    router.get('/api/feed-url', function(req, res) {
    var urlRss =  req.query.feedUrl;
    request(urlRss, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            parser.parseString(body, function (err, result) {
                console.log(result);
                res.send(result);
            });
        }
    });

    router.get('*', (req, res) => {
        res.redirect("/");
    });
});

    return router;
};


