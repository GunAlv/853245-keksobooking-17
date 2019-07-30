'use strict';

(function () {
  var PinMain = {
    WIDTH: 65,
    HEIGHT: 75
  };
  var Limit = {
    Y: 130,
    X: 630
  };
  var PinMainStartCoordinates = {
    TOP: 375,
    LEFT: 570
  };
  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressInput = document.querySelector('#address');

  var limitMoving = function (x, y, shiftX, shiftY) { // Ограничить передвижение главной метки
    if ((y > Limit.Y) && (y < Limit.X)) {
      pinMain.style.top = (pinMain.offsetTop - shiftY) + 'px';
    }

    if ((x > 0) && (x < (map.offsetWidth - PinMain.WIDTH))) {
      pinMain.style.left = (pinMain.offsetLeft - shiftX) + 'px';
    }
  };

  var getPinMainLocation = function (isActive) { // Получить координаты главной метки
    var pinMainPositionX = pinMain.offsetLeft;
    var pinMainPositionY = pinMain.offsetTop;
    var result;

    if (!isActive) {
      result = Math.floor(pinMainPositionX + (PinMain.WIDTH / 2)) + ', ' + (pinMainPositionY + PinMain.HEIGHT);
    } else {
      result = pinMainPositionX + ', ' + pinMainPositionY;
    }

    addressInput.value = result;
    addressInput.placeholder = result;
  };

  var returnPinMainToStartCoordinates = function () {
    pinMain.style.top = PinMainStartCoordinates.TOP + 'px';
    pinMain.style.left = PinMainStartCoordinates.LEFT + 'px';
    addressInput.value = PinMainStartCoordinates.LEFT + ', ' + PinMainStartCoordinates.TOP;
  };

  window.pinMain = {
    getLocation: getPinMainLocation,
    limitMoving: limitMoving,
    returnToStart: returnPinMainToStartCoordinates
  };
})();
