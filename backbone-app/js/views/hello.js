define(['jquery', 'underscore', 'backbone', 'text!templates/hello.html'],
        function($,_,Backbone, HelloTemplate){
  var HelloView = Backbone.View.extend({
    el:'#content',
    template: _.template(HelloTemplate),

    render:function(){
      var compiledTemplate = this.template();
      this.$el.html(compiledTemplate);
    },
    showPerson:function(){

    }
  });
  return HelloView;
});
