//display a list of categories
define(['jquery', 'underscore', 'backbone', 'text!templates/persons.html','collections/persons'],
        function($,_,Backbone, PersonsTemplate, Persons){
  var PersonsView = Backbone.View.extend({
    el:'#content',
    template: _.template(PersonsTemplate),
    events:{
      "click .product_link": "showPerson"
    },
    initialize:function(){
      this.persons = new Persons([], {url:'/server/persons'});
      this.listenTo( this.persons, 'sync', this.render);
    },
    render:function(){
      var data = {};
      var compiledTemplate = this.template({persons:this.persons.models});
      this.$el.html(compiledTemplate);
    },
    showPerson:function(){

    }
  });
  return PersonsView;
});
