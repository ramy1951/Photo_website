const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const DBconnection = require('../DBConnection');
const router = express.Router();


router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


router.get('/test', function(req, res) { //for testing purposes
  res.send(req.query.username);
  res.end();
});

router.post('/register', function(req, res) { // register function to insert into DB
  let queryStatment = "INSERT INTO `csc317db`.`users` (`username`, `email`, `password`) VALUES ('" + req.body.username+"', '" + req.body.email +"', '" + req.body.password + "');"
  
  DBconnection.query(queryStatment, function(error, result, fields){
    if(error){
      res.send('There was an error in registering, try a different username and email. http://localhost:3000/registration');
      console.log(error); // show error in console for debugging
    }else{
      console.log('successful insert');
      res.redirect(302,'../login');
    }
  });

});


router.use('/upload', fileUpload());

router.post('/upload', function(req, res) {

  
  const sampleFile = req.files.sampleFile;
  
  if(req.cookies.status){ // check if user is logged in to post photos
    
    const filePath = '/images/uploads/' + sampleFile.name;

    sampleFile.mv(filePath, function(err) {    
      console.log('File moved!');
    });

    DBconnection.query("INSERT INTO `csc317db`.`imageposts` (`title`, `description`, `fk_userid`, `photopath`) VALUES ('" + req.body.title + "', '" + req.body.description + "', '" + req.session.username +"', '" + filePath + "');", function(error,rows,fields){ 
      console.log('success upload');
      res.redirect(302, 'http://localhost:3000/view-posts');

   });
  
  }else{
    console.log('you cannot post unless you register!');
    res.redirect(302, 'http://localhost:3000/post-image');
  }

}); //end of upload post


//=================== LOGIN HANDLER ==============================

router.post('/login', function(req, res) {

  const username = req.body.username;
  const password = req.body.password;
  const sql_login = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  DBconnection.query(sql_login, [username, password], function(error, results, fields) {

      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = results[0].id;
        res.cookie('status', req.session.loggedin);
        res.redirect(302, 'http://localhost:3000/');
      }else{
        req.session.loggedin = false;
        res.cookie('status', request.session.loggedin);
        res.redirect(302, 'http://localhost:3000/login');
        console.log('credentials failed to be validated.');
      }

    res.end();
  });
}); //end of login post request


//=================== LOG OUT HANDLER ==============================




//=================== REGISTRATION HANDLER ==============================

// router.post('/Controller/register', function(req,res){
// 	var username = req.body.username;
// 	var password1 = req.body.password1;
// 	var password2 = req.body.password2;
// 	var email = req.body.email;
// 	var age = req.body.age;
// 	var terms = req.body.terms;
// 	var registrationQuery = 'INSERT INTO users (username, password, email) VALUES (? ,?, ?)';

// 	if(username && password1 && password2 && email && age && terms){
// 		if(password1 !== password2){
//       res.send('Passwords do not match.');
//       res.end();
// 		}
// 		else{
// 			DBconnection.query(registrationQuery, [username, password1, email], function(err, result, field){
// 				if(err){throw err}
// 				else{
//           console.log(result);
// 					res.send('Successfully registered new user.');
// 					res.redirect('/login');
// 					res.end();
// 				}
// 			});
// 		}
// 	}
// 	else{
// 		res.send('Please enter all fields and check both boxes.');
// 		res.end();
// 	}
// });


//=================== COMMENT HANDLER ==============================

router.post('/comment',function (res, req){
  var user = req.session.username;
  var comment = req.body.comment;
  var commentQuery = 'INSERT INTO comments '

  if(req.session.loggedin){

  } else{
    res.send("Must be logged in to comment.");
    res.redirect('/login');
    res.end();
  }
});


router.get('/logout', function(request, response){
  response.clearCookie('status',{ path: '/' });
  response.send('okay that works');
  console.log('COOKIE CLEARED');
});

router.get('/getImages', function(request, response) {

  DBconnection.query('SELECT photopath FROM imageposts ORDER BY id DESC', function(error, results, fields) {
    console.log(results)
    response.send(results);
  });
}); //end of getImages get request

router.get('/search', function(req, res){
  console.log('searching for ' + req.headers.searchingkey);

  var searchingWord = req.headers.searchingkey; 

  DBconnection.query('SELECT photopath FROM imageposts WHERE title LIKE "%'+searchingWord+'%" OR description LIKE "%'+searchingWord+'%" ORDER BY id DESC', function(error, results, fields) {
    if(error){
      console.log(error);
    }
    console.log('results of search: '+results);
    res.send(results);
  });
});

module.exports = router;