'use strict';

var PINS_QUANTITY = 8;
var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var removeClass = function (elem, elemClass) {
  elem.classList.remove(elemClass);
};

var getRandomNumber = function (min, max) { // Получить случайное число
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomIndex = function (array) { // Получить случайный индекс из массива
  return array[Math.floor(Math.random() * array.length)];
};

var generatePins = function (count) { // Создать массив объектов меток
  var pins = [];

  for (var i = 0; i < count; i++) {
    pins.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'type': getRandomIndex(PROPERTY_TYPES)
      },
      'location': {
        'x': getRandomNumber(0, mapPins.clientWidth) - PIN_WIDTH / 2,
        'y': getRandomNumber(Y_MIN, Y_MAX) - PIN_HEIGHT
      }
    });
  }

  return pins;
};


var renderPin = function (pin) { // Отрисовать метку
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;

  return pinElement;
};

var createFragment = function (pins) { // Создать и заполнить фрагмент метками
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }

  return fragment;
};

var addPinsToDOM = function (pins) { // Добавить в разметку метки
  mapPins.appendChild(createFragment(pins));
};


addPinsToDOM(generatePins(PINS_QUANTITY));
removeClass(map, 'map--faded');
