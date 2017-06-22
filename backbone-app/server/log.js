var log = function(app){
  app.post('/server/log', function(req, res){
    console.log(req.body);
    res.send('done');
      });
};

module.exports = log;
