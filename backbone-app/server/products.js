var products = function(app){
  app.get('/server/products/:productId', function(req, res){
    console.log(req.params.productId);
    if (req.params.productId=='electronics'){
      res.json([{name:'LCD', picWidth:200, details:'Buy LCDs', url:''},
                  {name:'Laptop', picWidth:200, details:'Buy Laptop', url:''},
                {name:'PCs', picWidth:200, details:'Buy PC', url:''},
              {name:'Tab', picWidth:200, details:'Buy Tab', url:''}])
    }
    else {
      res.json([{name:'Microwave', picWidth:200, details:'Buy Microwave', url:''},
                  {name:'Oven', picWidth:200, details:'Buy Oven', url:''}])
    }
  });

}
module.exports = products;
