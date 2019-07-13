'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomIndex: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    removeClass: function (element, elementClass) {
      element.classList.remove(elementClass);
    }
  };
})();
