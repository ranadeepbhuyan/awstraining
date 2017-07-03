var express = require('express');
var app = express();

app.use(express.static('.'));
app.use(express.static('./js'))

require('./server/upload')(app, express);
require('./server/persons')(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/hello', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/person', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/upload', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(80);
