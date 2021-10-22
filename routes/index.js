var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('../DBConnection');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  	res.sendFile('login.html', { root: 'public/' });
});

router.get('/view-posts', function(req, res, next) {
  res.sendFile('view-all.html', { root: 'public/' });
});

router.get('/search', function(req, res, next) {
  res.sendFile('view-all.html', { root: 'public/' });
});

router.get('/registration', function(req, res, next) {
  res.sendFile('Registration.html', { root: 'public/' });
});


router.get('/view-image', function(req, res, next) {
  res.sendFile('view-single-image.html', { root: 'public/' });
});

router.get('/post-image', function(req, res, next) {
  res.sendFile('post-new-image.html', { root: 'public/' });
}); 




module.exports = router;
