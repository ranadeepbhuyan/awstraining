define(['jquery', 'underscore', 'backbone','models/product'], function($,_,Backbone, ProductModel){
  var Products = Backbone.Collection.extend({
    model:ProductModel,
    url: '/server/products/',
    getProducts(categoryid){
      this.url = this.url + categoryid;
      return this.fetch();
    }  });
  return Products;
});
