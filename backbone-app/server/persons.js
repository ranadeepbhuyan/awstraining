var connection = require('./connection');
var persons = function(app){

  app.post('/server/persons', function(req, res){
    console.log('post persons');
    /*
    var post  = {from:'me', to:'you', msg:'hi'};
    connection.query('INSERT INTO messages SET ?', post, function(err, result) {
     if (err) throw err;
    });
    connection.query(
    'SELECT * FROM table WHERE id=? LIMIT ?, 5',[ user_id, start ],
    function (err, results) {

    });
    */
  });
  app.get('/server/persons/:pid', function(req, res){
    console.log('get person');
  });
  app.get('/server/persons', function(req, res){
    console.log('get persons');
  });
}

module.exports = persons;
