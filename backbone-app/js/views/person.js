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
      var picture = $('#inputFile')[0].files[0];
      var firstname = $('#firstName')[0].value;
      var lastname = $('#lastName')[0].value;
      var address = $('#address')[0].value;
      console.log('name:' + firstname + ' ' + lastname);
      var data = new FormData();
      data.append('file', picture);
      data.append('firstname', firstname);
      data.append('lastname', lastname);
      data.append('address', address);
      that = this;
      $.ajax({
        url: 'server/upload/',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
          that.showFile(data);
        },
        error: function(data){
          alert('no upload');
        }
      });
    }
  });
  return PersonView;
});
