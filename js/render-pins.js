'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var PINS_QUANTITY = 5;

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
    var quantity = pins.length > PINS_QUANTITY ? PINS_QUANTITY : pins.length;

    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    return fragment;
  };

  var addPinsToDOM = function (pins) { // Добавить в разметку метки
    mapPins.appendChild(createFragment(pins));
  };

  var removePinsFromDOM = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPinsItems.length; i++) {
      mapPinsItems[i].remove();
    }
  };

  window.pin = {
    addPinsToDOM: addPinsToDOM,
    removePinsFromDOM: removePinsFromDOM
  };
})();
