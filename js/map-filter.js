'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var mapFillter = document.querySelector('.map__filters');

  var renderFilteredPins = function (pins) {
    window.pin.clearPins();
    window.pin.addPinsToDOM(window.filtration(pins), window.card.show);
  };

  var mapShowFilteredPins = function (pins) {
    var onMapFilterChange = function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      var lastTimeout = window.setTimeout(function () {
        window.card.remove();
        renderFilteredPins(pins);
      }, DEBOUNCE_INTERVAL);
    };

    mapFillter.addEventListener('change', onMapFilterChange);
  };

  window.mapShowFilteredPins = mapShowFilteredPins;
})();
