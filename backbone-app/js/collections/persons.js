//display a list of categories
define(['jquery', 'underscore', 'backbone','models/person'], function($,_,Backbone, PersonModel){
  var Persons = Backbone.Collection.extend({
    model:PersonModel,
    url: '/server/persons/'
  });
  return Persons;
});
