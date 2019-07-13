'use strict';

(function () {
  var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var Y_MIN = 130;
  var Y_MAX = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth; // 1200

  window.generateData = function (count) { // Создать массив объектов меток
    var pins = [];

    for (var i = 0; i < count; i++) {
      pins.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'type': window.util.getRandomIndex(PROPERTY_TYPES)
        },
        'location': {
          'x': window.util.getRandomNumber(0, MAP_WIDTH) - PIN_WIDTH / 2,
          'y': window.util.getRandomNumber(Y_MIN, Y_MAX) - PIN_HEIGHT
        }
      });
    }

    return pins;
  };
})();
