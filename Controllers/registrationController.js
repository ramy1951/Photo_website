const express = require('express');
const router = express.Router();
const session = require('express-session');
const DBconnection = require('../DBConnection');

router.use('/regController', registrationController); //FIX THIS

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/Registration.html'));
});

router.post('/registration', function(req,res){
	var username = req.body.username;
	var password1 = req.body.password1;
	var password2 = req.body.password2;
	var email = req.body.email;
	var age = req.body.age;
	var terms = req.body.terms;
	var sql = 'INSERT INTO users (username, password, email) VALUES (? ,?, ?)';

	if(username && password1 && password2 && email && age && terms){
		if(password1 !== password2){
			res.send('Passwords do not match.');
		}
		else{
			DBconnection.query(sql, [username, password1, email], function(err, results, fields){
				if(err){throw err}
				else{
					res.send('Successfully registered new user.');
					res.redirect('/login');
					res.end();
				}
			});
		}
	}
	else{
		res.send('Please enter all fields and check both boxes.');
		res.end();
	}
});

module.exports = router;