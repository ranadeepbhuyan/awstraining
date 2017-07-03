var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'my-test-db.cgkq5citycpb.eu-west-1.rds.amazonaws.com',
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
