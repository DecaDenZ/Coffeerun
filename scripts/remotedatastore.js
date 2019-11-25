(function(window) {
   'use strict';
   var App = window.App || {};
   var $ = window.jQuery;

   function RemoteDataStore(url) {
      if (!url) {
         throw new Error('No remote URl supplied.');
      }
      this.serverUrl = url;
   }

   RemoteDataStore.prototype.add = function(key, val) {
      $.ajax(this.serverUrl + '/' + key, {
         type: 'GET',
         context: this,
         success: function(serverResponse) {
            if (serverResponse) {
               alert('заказ уже обрабатывается');
               throw new Error('заказ уже обрабатывается');
            } else {
               $.post(this.serverUrl, val, function(serverResponse) {
                  console.log(serverResponse, this.serverUrl);
               });
            }
         },
         error: function() {
            throw new Errror('Server error');
         }
      });
   };

   RemoteDataStore.prototype.getAll = function(cb) {
      $.get(this.serverUrl, function(serverResponse) {
         console.log(serverResponse);
         cb(serverResponse);
      });
   };

   RemoteDataStore.prototype.get = function(key, cb) {
      $.get(this.serverUrl + '/' + key, function(serverResponse) {
         console.log(serverResponse);
         cb(serverResponse);
      });
   };

   RemoteDataStore.prototype.remove = function(key, cb) {
      $.ajax(this.serverUrl + '/' + key, {
         type: 'DELETE'
      });
   };


   App.RemoteDataStore = RemoteDataStore;
   window.App = App;

})(window)
