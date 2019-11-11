(function(window) {
   'use strict';
   var App = window.App || {};
   var $ = window.jQuery;

   function FormHandler(selector) {
      if (!selector) {
         throw new Error('No selector provided');
      }
      //присваиваем переменной выборку обернутую jqery и проверяем есть ли в ней заданные селектором элементы элементы
      this.$formElement = $(selector);
      if (this.$formElement.length === 0) {
         throw new Error('Could not find element with selector: ' + selector);
      }
   }

   function modalHandler(data){
      if (data.size === "Coffee-Zilla" && data.strength === '100' && data.flavor) {
         $('#myModal').modal();
      }
      $('#myModal .btn-primary').on('click', function(){
         console.log('жмяк модальное окно');
      });

   };

   // функция обработчика события скрывается в метод прототипа, чтобы отделить от остального когда главной функции
   FormHandler.prototype.addSubmitHandler = function(fn) {
      console.log('Setting submit handler for form');
      this.$formElement.on('submit', function(event) {
         event.preventDefault();
         var data = {};
         $(this).serializeArray().forEach(function (item){
            data[item.name] = item.value;
            console.log(item.name + ' is ' +  item.value);
         });
         console.log(data);
         fn(data);
         modalHandler(data);
         this.reset();
         this.elements[0].focus();
         $('.strengthValue').text('');
      });
   };

   FormHandler.prototype.addRangeHandler = function(){
      this.$formElement.on('change', function(event){
         event.preventDefault();
         $('.strengthValue').text(event.target.value);
         $('.strengthValue').attr('style', 'color: hsl('+ (120 - event.target.value) +', 100%, 40%)');
      });
   };


   App.FormHandler = FormHandler;
   window.App = App;
})(window);
