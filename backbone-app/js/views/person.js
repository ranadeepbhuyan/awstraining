//display a list of categories
define(['jquery', 'underscore', 'backbone', 'text!templates/person.html','models/person'],
        function($,_,Backbone, PersonTemplate, Person){
  var PersonView = Backbone.View.extend({
    el:'#content',
    template: _.template(PersonTemplate),
    events:{
        'submit form': 'uploadPersonDetails'
    },

    render:function(){
      this.$el.html(this.template());
    },
    uploadPersonDetails:function(){
      event.preventDefault();
      //var picture = $('#inputFile')[0].files[0];
      var firstname = $('#firstName')[0].value;
      var lastname = $('#lastName')[0].value;
      var address = $('#address')[0].value;
      console.log('name:' + firstname + ' ' + lastname);
      var data = {};
      //data.append('file', picture);
      data.firstname = firstname;
      data.lastname = lastname;
      data.address = address;
      console.log(JSON.stringify(data));
      that = this;
      $.ajax({
        url: 'server/person/',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
        processData: false,
        type: 'POST',
        success: function(data){
          console.log('data saved')
        },
        error: function(data){
          alert('error saving data');
        }
      });
    }
  });
  return PersonView;
});
