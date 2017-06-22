//display a product
define(['jquery', 'underscore', 'backbone', 'text!templates/product.html', 'models/product'],
      function($,_,Backbone, productTemplate, Product){
  var ProductView = Backbone.View.extend({
    el:'#content',
    template: _.template(productTemplate),
    initialize(productid){
      var product = new Product();
      this.listenTo(product, 'change', this.render);
      product.getProduct(productid);

    },
    render:function(){
      var compiledTemplate = this.template( {product: this.product.model});
      this.$el.append(compiledTemplate);
    }
  });
  return ProductView;
});
