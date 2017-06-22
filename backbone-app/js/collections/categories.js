//display a list of categories
define(['jquery', 'underscore', 'backbone','models/category'], function($,_,Backbone, CategoryModel){
  var Categories = Backbone.Collection.extend({
    model:CategoryModel,
    url: '/server/categories/'
  });
  return Categories;
});
