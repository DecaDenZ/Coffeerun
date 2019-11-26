(function(winow) {
   'use strict';
   var FORM_SELECTOR = '[data-coffee-order="form"]';
   var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
   var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
   var App = window.App;
   var Truck = App.Truck;
   var DataStore = App.DataStore; // экземпляр базы для оффлайн режима
   var RemoteDataStore = App.RemoteDataStore;
   var FormHandler = App.FormHandler;
   var Validation = App.Validation;
   var CheckList = App.CheckList;
   var remoteDS = new RemoteDataStore(SERVER_URL); // экземпляр базы на сервере
   var webshims = window.webshims;
   var myTruck = new Truck('ncc-1701', remoteDS);
   window.myTruck = myTruck;
   var checkList = new CheckList(CHECKLIST_SELECTOR);
   var formHandler = new FormHandler(FORM_SELECTOR);
   var rangeHandler = new FormHandler('#strengthLevel');

   checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
   formHandler.addSubmitHandler(function(data) {
      return myTruck.createOrder.call(myTruck, data)
         .then(function() {
               checkList.addRow.call(checkList, data);
            },
            function() {
               // в случае отказа сервера переключаемся на локальную базу
               myTruck = new Truck('ncc-1701', new DataStore());
               alert('Server unreachable. Try again later.');
            }
         );
   });

   myTruck.printOrders(checkList.addRow.bind(checkList));

   formHandler.addInputHandler(Validation);

   rangeHandler.addRangeHandler();
   console.log(formHandler);

   webshims.polyfill('forms forms-ext');
   webshims.setOptions('forms', {
      addValidators: true,
      lazyCustomMessages: true
   });
})(window);
