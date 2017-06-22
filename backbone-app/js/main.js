require.config( {
  paths: {
    jquery:'lib/jquery',
    backbone:'lib/backbone',
    underscore:'lib/underscore'
  }
});
require (['app'], function(App){
  App.initialize();
});
