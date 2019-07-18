'use strict';

(function () {
  var FORM_ON = false;
  var FORM_OFF = true;
  var PINS_QUANTITY = 8;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 75;
  var MIN_LIMIT_Y = 130;
  var MAX_LIMIT_X = 630;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');

  var changeAttributeDisabled = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  var changeDisablingForm = function (isDisable) { // Функция блокировки/открытия формы
    var adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');
    var mapFilterFieldsets = document.querySelectorAll('.map__filters fieldset');
    var mapFilterSelects = document.querySelectorAll('.map__filters select');
    changeAttributeDisabled(adFormFieldsets, isDisable);
    changeAttributeDisabled(mapFilterFieldsets, isDisable);
    changeAttributeDisabled(mapFilterSelects, isDisable);
  };

  var getPinMainLocation = function (isActive) { // Получить координаты главной метки
    var addressInput = document.querySelector('#address');
    var pinMainPositionX = pinMain.offsetLeft;
    var pinMainPositionY = pinMain.offsetTop;
    var result;

    if (!isActive) {
      result = Math.floor(pinMainPositionX + (MAIN_PIN_WIDTH / 2)) + ', ' + (pinMainPositionY + MAIN_PIN_HEIGHT);
    } else {
      result = pinMainPositionX + ', ' + pinMainPositionY;
    }

    addressInput.value = result;
    addressInput.placeholder = result;
  };

  changeDisablingForm(FORM_OFF); // Заблокировать форму
  getPinMainLocation(FORM_OFF); // Получить координаты главной метки без учета ее острого конца

  // Функции активации страницы

  var onLoadSuccess = function (pins) { // Добавление меток в случае успешного получения данных от сервера
    window.addPinsToDOM(pins, PINS_QUANTITY);
  };

  var onLoadError = function () { // Показать ошибку, если возникли проблемы с сервером
    window.showErrorModal();
  };

  var makePageActive = function () { // Активация страницы
    changeDisablingForm(FORM_ON); // Разблокировать формы
    window.backend.load(onLoadSuccess, onLoadError); // Загрузить данные меток из сервера
    window.util.removeClass(map, 'map--faded');
    window.util.removeClass(adForm, 'ad-form--disabled');
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (map.classList.contains('map--faded')) {
      makePageActive();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      getPinMainLocation(FORM_ON);

      var currentCoorditaneY = pinMain.offsetTop - shift.y;
      var currentCoordinateX = pinMain.offsetLeft - shift.x;

      if ((currentCoorditaneY > MIN_LIMIT_Y) && (currentCoorditaneY < MAX_LIMIT_X)) {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      if ((currentCoordinateX > 0) && (currentCoordinateX < (map.offsetWidth - MAIN_PIN_WIDTH))) {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getPinMainLocation(FORM_ON);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
