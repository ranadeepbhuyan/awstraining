//display a list of categories
define(['jquery', 'underscore', 'backbone', 'text!templates/home.html','collections/categories'],
        function($,_,Backbone, homeTemplate, Categories){
  var HomeView = Backbone.View.extend({
    el:'#content',
    template: _.template(homeTemplate),
    events:{
      "click .product_link": "showProductPage"
    },
    initialize:function(){
      this.categories = new Categories([], {url:'/server/categories'});
      this.listenTo( this.categories, 'sync', this.render);
    },
    render:function(){
      var data = {};
      var compiledTemplate = this.template({categories:this.categories.models});
      this.$el.html(compiledTemplate);
    }
  });
  return HomeView;
});
