'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var renderPin = function (pin) { // Отрисовать метку
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  var createFragment = function (pins, quantity) { // Создать и заполнить фрагмент метками
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    return fragment;
  };

  var addPinsToDOM = function (pins, quantity) { // Добавить в разметку метки
    mapPins.appendChild(createFragment(pins, quantity));
  };

  window.addPinsToDOM = addPinsToDOM;
})();
