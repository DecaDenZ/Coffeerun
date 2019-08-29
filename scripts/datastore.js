(function (window){
   'use strict';
   var App = window.App || {};

   function Datastore(){
      console.log('running the Datastore function');
   }

   App.Datastore = Datastore;
   window.App = App;
})(window);
