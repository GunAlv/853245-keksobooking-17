'use strict';

var PINS_QUANTITY = 8;
var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var FORM_OFF = true;
var FORM_ON = false;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
var mapFilterFieldsets = document.querySelectorAll('.map__filters fieldset');
var mapFilterSelects = document.querySelectorAll('.map__filters select');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressInput = document.querySelector('#address');

var removeClass = function (element, elementClass) {
  element.classList.remove(elementClass);
};


// Функции переключения состояния форм

var changeAttributeDisabled = function (elements, isDisabled) { // ***Изменить функцию
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = isDisabled;
  }
};

var changeDisablingForm = function (isDisable) {
  changeAttributeDisabled(adFormFieldsets, isDisable);
  changeAttributeDisabled(mapFilterFieldsets, isDisable);
  changeAttributeDisabled(mapFilterSelects, isDisable);
};

changeDisablingForm(FORM_OFF);


// Функции рендера меток

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

var getPinMainLocation = function (isActive) { // Получить координаты главной метки
  var pinMainPositionX = pinMain.offsetLeft;
  var pinMainPositionY = pinMain.offsetTop;
  var result;

  if (isActive) {
    result = pinMainPositionX + ', ' + pinMainPositionY;
  } else {
    result = Math.floor(pinMainPositionX + (MAIN_PIN_WIDTH / 2)) + ', ' + (pinMainPositionY + MAIN_PIN_HEIGHT);
  }

  addressInput.value = result;
};

getPinMainLocation(FORM_OFF);


// Функции активации страницы

var makePageActive = function () {
  changeDisablingForm(FORM_ON);
  addPinsToDOM(generatePins(PINS_QUANTITY));
  removeClass(map, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');
  pinMain.removeEventListener('click', onPinMainClick); // Удаляем обработчик для предотвращения добавления новых меток
};

var onPinMainClick = function () {
  makePageActive();
};

pinMain.addEventListener('click', onPinMainClick);

var onPinMainMouseup = function () {
  getPinMainLocation(FORM_ON); // Вставляем координаты острого угла главной метки при активации страницы
};

pinMain.addEventListener('mouseup', onPinMainMouseup);

