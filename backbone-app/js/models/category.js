//display a list of products in a category
define(['jquery', 'underscore', 'backbone'], function($,_,Backbone){
  var CategoryModel = Backbone.Model.extend({
    defaults:{
      name:'Electronics'
    }
  });
  return CategoryModel;
});
