(function(window){
   'use strict';
   var App = window.App || {};
   var Validation = {
      isCompanyEmail: function (email){
         return /.+@gmail\.com$/.test(email);
      },

      isDecaf: function (order, strength){
         if ((order.indexOf('decaf') !== -1) && (strength > 20)){
            return false;
         } else {
            return true;
         }
      }
   };

   App.Validation = Validation;
   window.App = App;

})(window)
