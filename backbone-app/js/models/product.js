//product model
define(['jquery', 'underscore', 'backbone'], function($,_,Backbone){
  var ProductModel = Backbone.Model.extend({
    defaults:{
      name:'IPhone'
    },
    url:'/server/product/',
    getProduct(productid){
      this.url = this.url + productid;
      this.fetch();
    }
  });
  return ProductModel;
});
