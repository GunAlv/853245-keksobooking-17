'use strict';

(function () {
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 75
  };
  var Limit = {
    Y: 130,
    X: 630
  };
  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

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

  window.pinMain = {
    getLocation: getPinMainLocation,
    limitMoving: limitMoving
  };
})();
