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

  window.changeDisablingForm(FORM_OFF); // Заблокировать форму
  getPinMainLocation(FORM_OFF); // Получить координаты главной метки без учета ее острого конца

  // Функции активации страницы

  var onLoadSuccess = function (pins) { // Добавление меток в случае успешного получения данных от сервера
    window.pin.addPinsToDOM(pins);
  };

  var onLoadError = function () { // Показать ошибку, если возникли проблемы с сервером
    window.showErrorModal();
  };

  var makePageActive = function () { // Активация страницы
    window.changeDisablingForm(FORM_ON); // Разблокировать формы
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

      if ((currentCoorditaneY > Limit.Y) && (currentCoorditaneY < Limit.X)) {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      if ((currentCoordinateX > 0) && (currentCoordinateX < (map.offsetWidth - MainPin.WIDTH))) {
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
