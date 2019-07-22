'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');

  var removeCard = function () {
    var card = mapBlock.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var showCard = function (pins, mapPins) {
    mapPins.forEach(function (mapPin, index) {
      mapPin.addEventListener('click', function () {

        removeCard();

        var createdFragment = window.createFragmentForCard(pins[index - 1]);
        mapBlock.insertBefore(createdFragment, filterContainer);
      });
    });
  };

  window.showCard = showCard;
})();
