'use strict';

(function () {
  var FORM_ON = false;
  var FORM_OFF = true;
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 75
  };
  var Limit = {
    Y: 130,
    X: 630
  };
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var copiedData = [];

  var limitMoving = function (x, y, shiftX, shiftY) { // Ограничить передвижение главной метки
    if ((y > Limit.Y) && (y < Limit.X)) {
      pinMain.style.top = (pinMain.offsetTop - shiftY) + 'px';
    }

    if ((x > 0) && (x < (map.offsetWidth - MainPin.WIDTH))) {
      pinMain.style.left = (pinMain.offsetLeft - shiftX) + 'px';
    }
  };

  var getPinMainLocation = function (isActive) { // Получить координаты главной метки
    var addressInput = document.querySelector('#address');
    var pinMainPositionX = pinMain.offsetLeft;
    var pinMainPositionY = pinMain.offsetTop;
    var result;

    if (!isActive) {
      result = Math.floor(pinMainPositionX + (MainPin.WIDTH / 2)) + ', ' + (pinMainPositionY + MainPin.HEIGHT);
    } else {
      result = pinMainPositionX + ', ' + pinMainPositionY;
    }

    addressInput.value = result;
    addressInput.placeholder = result;
  };

  var setPinMainLocationWithoutAngle = function () {
    getPinMainLocation(FORM_OFF);
  };

  var setPinMainLocationWithAngle = function () {
    getPinMainLocation(FORM_ON);
  };

  window.changeDisablingForm(FORM_OFF);
  setPinMainLocationWithoutAngle(); // Получить координаты главной метки без учета ее острого конца

  var onLoadSuccess = function (data) { // Добавление необходимых данных в случае успешного обращения на сервер
    copiedData = data.slice();
    window.pin.addPinsToDOM(copiedData, window.showCard); // Добавление меток
    window.filter.filtrationMap(copiedData); // Фильтрация меток на карте
  };

  var onLoadError = function () { // Показать ошибку, если возникли проблемы с сервером
    window.showErrorModal();
    window.changeDisablingForm(FORM_OFF);
  };

  var makePageActive = function () { // Активация страницы
    window.changeDisablingForm(FORM_ON); // Разблокировать формы
    window.backend.load(onLoadSuccess, onLoadError); // Загрузить данные меток из сервера
    window.util.removeClass(map, 'map--faded');
    window.util.removeClass(adForm, 'ad-form--disabled');
  };

  window.activate = {
    makePageActive: makePageActive,
    limitMoving: limitMoving,
    setPinMainLocationWithoutAngle: setPinMainLocationWithoutAngle,
    setPinMainLocationWithAngle: setPinMainLocationWithAngle
  };
})();
