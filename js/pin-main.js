'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  var CurrentCoords = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var onPinMainKeydown = function (evt) {
    window.util.isEnterEvent(evt, window.activate.makePageActive);
    pinMain.removeEventListener('keydown', onPinMainKeydown);
  };

  pinMain.addEventListener('keydown', onPinMainKeydown);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (map.classList.contains('map--faded')) {
      window.activate.makePageActive();
    }

    var startCoords = new CurrentCoords(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new CurrentCoords(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords = new CurrentCoords(moveEvt.clientX, moveEvt.clientY);

      window.activate.setPinMainLocationWithAngle();

      var currentCoorditaneY = pinMain.offsetTop - shift.y;
      var currentCoordinateX = pinMain.offsetLeft - shift.x;

      window.activate.limitMoving(currentCoordinateX, currentCoorditaneY, shift.x, shift.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.activate.setPinMainLocationWithAngle();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
