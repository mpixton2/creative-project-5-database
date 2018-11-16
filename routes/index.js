var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/bookClub',{ useNewUrlParser: true }); //Connects to a mongo database 

var bookSchema = mongoose.Schema({ //Defines the Schema for this database
    book: String,
    review: String
});

var Book = mongoose.model('Book', bookSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});



router.post('/reviews', function(req, res, next) {
  console.log("POST comment route"); 
  console.log(req.body); 
  var newbook = new Book(req.body); 
  console.log(newbook); 
  newbook.save(function(err, post) { 
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});


router.post('/query', function(req, res, next) {
    console.log('Now in query route');
    console.log(req.body.Query);
    var q = req.body.Query;
    var query = { book: q };
    db.collection("books").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });

})


router.get('/reviews', function(req, res, next) {
  console.log("In the GET route");
  Book.find(function(err,bookList) { 
    if (err) return console.error(err); 
    else {
      console.log(bookList); 
      res.json(bookList); 
    }
  })
  
});



module.exports = router;
