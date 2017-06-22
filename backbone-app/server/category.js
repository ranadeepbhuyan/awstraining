var category = function(app){
  app.get('/server/categories', function(req, res){
    res.json([{id:'electronics', name:'Electronics', picWidth:200, details:'Buy Phones, LEDs, PCs, Tabs', url:'/server/products/Electronics'},
                {id:'homeappliances', name:'Home Appliances', picWidth:200, details:'Buy Microwaves, Ovens, Refrigerators', url:'/server/product/homeappliances'}]);

  });
};

module.exports = category;
