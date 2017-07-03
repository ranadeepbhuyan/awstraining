var connection = require('./connection');
var bodyParser = require('body-parser');

var person = function(app, express){
  app.use(bodyParser.json()); // for parsing application/json
  app.post('/server/person', function(req, res){
        //console.log(req.body.firstname);
        connection.query(
        'INSERT INTO persons SET ?',req.body,
        function (err, results) {
          if (err){
            console.log(err);
          }
          else {
            console.log(results);
          }
          res.json(req.body);
          res.end();

        });
        /*return;
        var finalBuffer = Buffer.concat(this.fileRead);
        console.log('finalbuffer:' + finalBuffer.length);
        console.log('mimetype:' + mimetype);
        console.log('filename:' + filename);
        var uploadedFileData = {
                buffer: finalBuffer,
                filename: filename,
                headers : {
                   'Content-Length': finalBuffer.length,
                   'Content-Type': mimetype,
                   'x-amz-acl': 'public-read'
                 }
              };
        uploadS3(uploadedFileData, function(err, url) {
          if (err){
            res.statusCode = 500;
            res.json({filepath:'', error:err.message});
          }
          else {
              res.statusCode = 200;
              res.json({filepath:url});
          }
          console.log('till here')
          res.end();

    });
  });*/
		});
  };




module.exports = person;
