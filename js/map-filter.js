'use strict';

(function () {
  var mapFillter = document.querySelector('.map__filters');
  var DEBOUNCE_INTERVAL = 500;

  var renderFilteredPins = function (pins) {
    var pinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinItems.forEach(function (item) {
      item.remove();
    });

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
