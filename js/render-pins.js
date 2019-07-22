'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var PIN_WIDTH_HALF = 50 / 2;
  var PIN_HEIGHT = 70;

  var renderPin = function (pin) { // Отрисовать метку
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (pin.location.x - PIN_WIDTH_HALF) + 'px';
    pinElement.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  var addPinsToDOM = function (pins) { // Добавить в разметку метки
    mapPins.appendChild(window.create.fragment(pins, renderPin));
  };

  var removePinsFromDOM = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPinsItems.forEach(function (pinItem) {
      pinItem.remove();
    });
  };

  window.pin = {
    addPinsToDOM: addPinsToDOM,
    removePinsFromDOM: removePinsFromDOM
  };
})();
