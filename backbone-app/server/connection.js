var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'mysql-test.c0rbajdnnnhi.us-west-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'Intuit123',
    database    : 'peopledb'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

module.exports = connection;
