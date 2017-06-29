define('router',['jquery', 'underscore', 'backbone'], function($,_,Backbone){
  var Router = Backbone.Router.extend({
    routes : {
      '':'showPersons',
      '/':'showPersons',
      '/person/:pid': 'addEditPerson',
      'upload':'showUpload'
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
    $("body").get(0).addEventListener("click", function(){
      window.sendData();
    }, true);
  } ;

  return {initialize:initialize};
});
