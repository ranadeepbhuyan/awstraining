define(['jquery', 'underscore', 'backbone', 'text!templates/upload.html'], function($, _, Backbone, UploadTemplate ){
          var uploadView = Backbone.View.extend({
            el:'#content',
            events:{
              'submit form': 'uploadFile'
            },
            template:_.template(UploadTemplate),
            initialize: function(){
            },
            render: function(){
              this.$el.html(this.template());
            },
            uploadFile:function(){
              event.preventDefault();
              var picture = $('input[name="ImageData"]')[0].files[0];
              var data = new FormData();
              data.append('file', picture);
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
            },
            showFile:function(data){
              var compiledTemplate = this.template({image:data.filepath})
              this.$el.html(compiledTemplate);
            }

          });

          return uploadView;


});
