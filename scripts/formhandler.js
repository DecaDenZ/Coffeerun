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

   //функция модального окна срабатывающая при опр условиях
   function modalHandler(data) {
      let $bonusForm = $('#bonus');
      if (data.size === "Coffee-Zilla" && data.strength === '100' && data.flavor) {

         if ($bonusForm.attr('style') === 'visibility: visible') {
            $bonusForm.attr('style', 'visibility: hidden').val('Не выбран');
            $('#myModal .btn-primary').off('click');
            return true;
         }

         $('#myModal').modal();
         $('#myModal .btn-primary').on('click', function() {
// если в первый раз почта не была введена, то при повторном нажатии
//проверка все равно выдает false, даже если почта указана.
            if (data.emailAddress) {
               $bonusForm.attr('style', 'visibility: visible');
            } else {
              alert('Вы не ввели адрес почты');
           };
           $('#myModal').modal('hide');
           return false;
         });

      }
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
