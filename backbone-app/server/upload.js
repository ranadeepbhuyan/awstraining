var Busboy = require('busboy');
//var uploadS3 = require('./uploadS3');
var connection = require('./connection');


var upload = function(app, express){

  app.post('/server/upload', function(req, res){
  //  console.log('uploaded file ' + req.files.file.path);
    // Create an Busyboy instance passing the HTTP Request headers.
		var busboy = new Busboy({ headers: req.headers });
    var person = {};

    busboy.on('field', function(fieldName, fieldValue, valTruncated,keyTruncated) {
      console.log('fieldname:' + fieldName + ', fieldValue=' + fieldValue);
      person[fieldName] = fieldValue;
    });

		// Listen for event when Busboy finds a file to stream.
		busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      console.log(filename);
      file.fileRead = [];

			// We are streaming! Handle chunks
			file.on('data', function (chunk) {
				// Here we can act on the data chunks streamed.
        this.fileRead.push(chunk);
			});

			// Completed streaming the file.
			file.on('end', function () {
				console.log('Finished with ' + fieldname);
        connection.query(
        'INSERT INTO persons SET ?',person,
        function (err, results) {
          if (err){
            console.log(err);
          }
          else {
            console.log(results);
          }
        });
        res.json(person);
        res.end();
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

    });*/
			});
		});

		// Listen for event when Busboy finds a non-file field.
		busboy.on('field', function (fieldname, val) {
			// Do something with non-file field.
		});

		// Listen for event when Busboy is finished parsing the form.
		busboy.on('finish', function () {
			//res.end();
		});

		// Pipe the HTTP Request into Busboy.
		req.pipe(busboy);




  });

}

module.exports = upload;
