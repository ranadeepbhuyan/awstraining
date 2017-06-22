//display a list of products in a category
define(['jquery', 'underscore', 'backbone', 'text!templates/category.html','collections/products'],
      function($,_,Backbone, categoryTemplate, Products){
  var CategoryView = Backbone.View.extend({
    el:'#content',
    template: _.template(categoryTemplate),
    initialize:function(categoryid){
      this.products = new Products();
      this.listenTo(this.products, 'sync', this.render);
      this.products.getProducts(categoryid);
    },
    render:function(){
        var compiledTemplate = this.template({products:this.products.models});
        this.$el.html(compiledTemplate);
    }
  });
  return CategoryView;
});
