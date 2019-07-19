'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomIndex: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    removeClass: function (element, elementClass) {
      element.classList.remove(elementClass);
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
