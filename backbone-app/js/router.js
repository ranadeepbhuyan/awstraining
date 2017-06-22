define('router',['jquery', 'underscore', 'backbone'], function($,_,Backbone){
  var Router = Backbone.Router.extend({
    routes : {
      '':'showHome',
      '/':'showHome',
      'category/:categoryid':'showCategory',
      'product/:productid':'showProduct'
    },
    showHome : function(){
      require(['js/views/home.js'], function(HomeView){
        var homeView = new HomeView();
        homeView.categories.fetch();

        //  homeView.render();
      });
    },
    showCategory: function(categoryid){
      require(['/js/views/category.js'], function(CategoryView){
        var categoryView = new CategoryView(categoryid);
      });
    },
    showProduct: function(productid){
      require(['/js/views/product.js'], function(ProductView){
        var productView = new ProductView(productid);
      });
    }
  });

  var initialize = function(){
    var router = new Router;
    Backbone.history.start({pushState:true});
    $(document).on("click", "a[href^='/']", function(event){
      event.preventDefault();
      router.navigate($(event.target.parentElement).attr("href"), {trigger: true});
    });
    $("body").get(0).addEventListener("click", function(){
      window.sendData();
    }, true);
  } ;

  return {initialize:initialize};
});
