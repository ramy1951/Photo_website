const express = require('express');
const session = require('express-session');
const router = express.Router();
const app = express();
const DBconnection = require('../DBConnection');


router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

router.use('/loginController', loginController);
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/login.html'));
});

router.post('/auth', function(req, res) { 
	var username = req.body.username;
  	var password = req.body.password;
  
	if (username && password) {		
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

router.get('/home', function(req, res) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send('Please login to view this page.');
	}
	res.end();
});


module.exports = router;