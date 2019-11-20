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
      };
   };

   //функция модального окна срабатывающая при опр условиях
   function modalHandler(data) {
      let $bonusForm = $('#bonus');

      if (data.size === "Coffee-Zilla" && data.strength === '100' && data.flavor) {
         if ($bonusForm.attr('style') === 'visibility: visible') {
            $bonusForm.attr('style', 'visibility: hidden').val('Не выбран');
            $('#myModal .btn-primary').off('click');
            return true;
         };
         $('#myModal').modal();
         $('#myModal .btn-primary').on('click', function() {
            $bonusForm.attr('style', 'visibility: visible');
            $('#myModal .btn-primary').off('click');
            $('#myModal').modal('hide');
            return false;
         });
      } else {
         return true;
      };
   };

   // функция обработчика события скрывается в метод прототипа, чтобы отделить от остального когда главной функции
   FormHandler.prototype.addSubmitHandler = function(fn) {
      console.log('Setting submit handler for form');
      this.$formElement.on('submit', function(event) {
         event.preventDefault();
         var data = {};
         $(this).serializeArray().forEach(function(item) {
            data[item.name] = item.value;
            console.log(item.name + ' is ' + item.value);
         });
         console.log(data);
         if (!modalHandler(data)) return;
         fn(data);
         this.reset();
         this.elements[0].focus();
         $('.strengthValue').text('');
      });
   };

   FormHandler.prototype.addInputHandler = function (validation) {
      console.log('Setting input handler for form');

      this.$formElement.on('input', '[name="emailAddress"]', function(event){
         // обработка события
         var emailAddress = event.target.value;
         var message = '';
         if (validation.isCompanyEmail(emailAddress)) {
            event.target.setCustomValidity('');
         } else {
            message = emailAddress + ' is not an authorized email address!';
            event.target.setCustomValidity(message);
         }
      });

      this.$formElement.on('input', '[name="coffee"]', function(event){
         // обработка события
         var order = event.target.value;
         var message = '';
         if (validation.isDecaf(order)) {
            event.target.setCustomValidity('');
         } else {
            message = order + ' is too strong, you need to decrase coffeine rating!';
            event.target.setCustomValidity(message);
         }
      });
   };

   FormHandler.prototype.addRangeHandler = function() {
      this.$formElement.on('change', function(event) {
         event.preventDefault();
         $('.strengthValue').text(event.target.value);
         $('.strengthValue').attr('style', 'color: hsl(' + (120 - event.target.value) + ', 100%, 40%)');
      });
   };


   App.FormHandler = FormHandler;
   window.App = App;
})(window);
