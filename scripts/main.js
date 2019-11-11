(function (winow){
   'use strict';
   var FORM_SELECTOR = '[data-coffee-order="form"]';
   var App = window.App;
   var Truck = App.Truck;
   var DataStore = App.DataStore;
   var FormHandler = App.FormHandler;
   var myTruck = new Truck('ncc-1701', new DataStore());
   window.myTruck = myTruck;
   var formHandler = new FormHandler(FORM_SELECTOR);
      FORM_SELECTOR = '#strengthLevel';
   var rangeHandler = new FormHandler(FORM_SELECTOR);

   formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
   rangeHandler.addRangeHandler();
   console.log(formHandler);
})(window);
