(function(window) {
   'use strict';
   var App = window.App || {};
   var $ = window.jQuery;

   function CheckList(selector) {
      if (!selector) {
         throw new Error('No selector provided');
      }

      this.$element = $(selector);
      if (this.$element.length === 0) {
         throw new Error('Could not find element with selector: ' + selector);
      }
   }

   function Row(coffeeOrder) {
      var $div = $('<div></div>', {
         'data-coffee-order': 'checkbox',
         'class': 'checkbox'
      });

      var flavor;
      switch (coffeeOrder.flavor) {
         case 'caramel':
            flavor = '#F5BCA9'
            break;
         case 'almond':
            flavor = '#B45F04'
            break;
         case 'mocha':
            flavor = '#3B240B; color: #F5F6CE'
            break;
         default:
            flavor = 'white'
      };

      var $label = $('<label></label', {
         style: 'background-color: ' + flavor
      });


      var $checkbox = $('<input></input>', {
         type: 'checkbox',
         value: coffeeOrder.emailAddress,
      });

      var description = ' [' + coffeeOrder.strength + 'x] ';
      if (coffeeOrder.flavor) {
         description += coffeeOrder.flavor + ' ';
      }

      description += coffeeOrder.size + ' ';
      description += coffeeOrder.coffee + ', ';
      description += ' (' + coffeeOrder.emailAddress + ')';

      $label.append($checkbox);
      $label.append(description);
      $div.append($label);

      this.$element = $div;
   }

   CheckList.prototype.addRow = function(coffeeOrder) {
      //удаляем имеющиеся строки, с указанным адресом почты
      this.removeRow(coffeeOrder.emailAddress);
      var rowElement = new Row(coffeeOrder);
      this.$element.append(rowElement.$element);
   };

   CheckList.prototype.removeRow = function(email) {
      this.$element
         .find('[value="' + email + '"]')
         .closest('[data-coffee-order="checkbox"]')
         .remove();
   };

   CheckList.prototype.addClickHandler = function(fn) {
     var timeoutId = null, clicks = 0;
      this.$element
         .on('click', 'input',
            function(event) {
              clicks++;
              if (clicks === 1)
               timeoutId = setTimeout(() => {
                  console.log('click');
                  var email = event.target.value;
                  this.removeRow(email);
                  fn(email);
               }, 3000);
            }.bind(this))
// https://stackoverflow.com/questions/6330431/jquery-bind-double-click-and-single-click-separately/7845282#7845282
         .on('dblclick', 'input',
            function(event) {
               alert('dblclick');
            })
   };

   // CheckList.prototype.addDoubleClickHandler = function(coffeeOrder) {
   //    this.$element.on('dblclick', 'input',
   //       function(event) {
   //          alert('dblclick');
   //       })
   // }


   App.CheckList = CheckList;
   window.App = App;
})(window);
