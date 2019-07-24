'use strict';

(function () {
  var Price = {
    MIN: 10000,
    MAX: 50000
  };
  var selectHousingType = document.querySelector('#housing-type');
  var selectHousingPrice = document.querySelector('#housing-price');
  var selectHousingRooms = document.querySelector('#housing-rooms');
  var selectHousingGuests = document.querySelector('#housing-guests');
  // var inputFeatures = document.querySelectorAll('.map__checkbox');


  var getPriceToString = function (price) {
    if (price < Price.MIN) {
      return 'low';
    } else if (price > Price.MAX) {
      return 'high';
    } else {
      return 'middle';
    }
  };

  var filterStringValue = function (selectValue, dataValue) {
    return selectValue === 'any' || parseInt(selectValue, 10) === dataValue;
  };

  var filterValue = function (selectValue, dataValue) {
    return selectValue === 'any' || selectValue === dataValue;
  };

  var filterPrice = function (selectValue, dataValue) {
    return selectValue === 'any' || selectValue === getPriceToString(dataValue);
  };

  var filter = function (pins) {
    var filteredPins = pins;

    return filteredPins.filter(function (filteredPin) {
      return filterStringValue(selectHousingRooms.value, filteredPin.offer.rooms) &&
      filterStringValue(selectHousingGuests.value, filteredPin.offer.guests) &&
      filterValue(selectHousingType.value, filteredPin.offer.type) &&
      filterPrice(selectHousingPrice.value, filteredPin.offer.price);
    });
  };

  var changedPins = function (pins) {
    var pinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinItems.forEach(function (item) {
      item.remove();
    });
    window.pin.addPinsToDOM(filter(pins), window.showCard);
  };

  var mapFillters = document.querySelector('.map__filters');

  window.filtration = function (pins) {
    mapFillters.addEventListener('change', function () {
      changedPins(pins);
    });
  };
})();
