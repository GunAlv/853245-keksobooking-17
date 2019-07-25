'use strict';

(function () {
  var mapFillter = document.querySelector('.map__filters');

  var renderFilteredPins = function (pins) {
    var pinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinItems.forEach(function (item) {
      item.remove();
    });

    window.pin.addPinsToDOM(window.filtration(pins), window.showCard);
  };

  var mapShowFilteredPins = function (pins) {
    var onMapFilterChange = function () {
      renderFilteredPins(pins);
    };

    mapFillter.addEventListener('change', onMapFilterChange);
  };

  window.mapShowFilteredPins = mapShowFilteredPins;
})();
