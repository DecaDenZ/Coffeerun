(function (winow){
   'use strict';
   var FORM_SELECTOR = '[data-coffee-order="form"]';
   var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
   var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
   var App = window.App;
   var Truck = App.Truck;
   var DataStore = App.DataStore;
   var RemoteDataStore = App.RemoteDataStore;
   var FormHandler = App.FormHandler;
   var Validation = App.Validation;
   var CheckList = App.CheckList;
   var remoteDS = new RemoteDataStore(SERVER_URL);
   var webshims = window.webshims;
   var myTruck = new Truck('ncc-1701', remoteDS);
   window.myTruck = myTruck;
   var checkList = new CheckList(CHECKLIST_SELECTOR);
   var formHandler = new FormHandler(FORM_SELECTOR);
   var rangeHandler = new FormHandler('#strengthLevel');

   checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
   formHandler.addSubmitHandler(function(data){
     myTruck.createOrder.call(myTruck, data);
     checkList.addRow.call(checkList, data);
   });

   formHandler.addInputHandler(Validation);

   rangeHandler.addRangeHandler();
   console.log(formHandler);
   webshims.polyfill('forms forms-ext');
   webshims.setOptions('forms', { addValidators: true, lazyCustomMessages: true});
})(window);
