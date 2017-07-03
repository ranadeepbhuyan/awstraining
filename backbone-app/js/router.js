define('router',['jquery', 'underscore', 'backbone'], function($,_,Backbone){
  var Router = Backbone.Router.extend({
    routes : {
      '':'showPersons',
      '/':'showPersons',
      'person/:pid': 'addEditPerson',
      'person': 'addEditPerson',
      'upload':'showUpload',
      'hello':'showHello'
    },
    showHello : function(){
      require(['js/views/hello.js'], function(HelloView){
        var helloView = new HelloView();
        helloView.render();
      });
    },
    showPersons : function(){
      require(['js/views/persons.js'], function(PersonsView){
        var personsView = new PersonsView();
        personsView.persons.fetch();
      });
    },
    addEditPerson: function(pid){
      require(['/js/views/person.js'], function(PersonView){
        var personView = new PersonView(pid);
        personView.render();
      });
    },
    showUpload: function(){
      require(['/js/views/upload.js'], function(UploadView){
        var uploadView = new UploadView();
        uploadView.render();
      })
    }
  });

  var initialize = function(){
    var router = new Router;
    Backbone.history.start({pushState:true});
    $(document).on("click", "a[href^='/']", function(event){
      event.preventDefault();
      router.navigate($(event.target.parentElement).attr("href"), {trigger: true});
    });
  } ;

  return {initialize:initialize};
});
