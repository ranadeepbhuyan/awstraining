var express = require('express');
var app = express();

app.use(express.static('.'));
app.use(express.static('./js'))

require('./server/category')(app);
require('./server/products')(app);
require('./server/log')(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/category', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.listen(3001);
