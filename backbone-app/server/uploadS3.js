var config = require('../config/dev.json');
var Knox = require('knox');
// Create the knox client with your aws settings
Knox.aws = Knox.createClient({
  key: config.aws.AWS_ACCESS_KEY_ID,
  secret: config.aws.AWS_SECRET_ACCESS_KEY,
  bucket: config.aws.S3_BUCKET_NAME,
  region: 'us-west-2'
});

var uploadS3 = function(file, next){
  Knox.aws.putBuffer( file.buffer, '/artwork/' + file.filename, file.headers, function(err, response){
      if (err) {
        console.error('error streaming image: ', new Date(), err);
        next(err);
      }
      if (response.statusCode !== 200) {
        console.error('error streaming image: ', new Date(), err);
        next(err);
      }
      console.log('Amazon response statusCode: ', response.statusCode);
      console.log('Your file was uploaded');
      next(err, '/artwork/' + file.filename);
    });
}

module.exports = uploadS3;