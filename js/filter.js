'use strict';

(function () {
  // var Price = {
  //   MIN: 10000,
  //   MAX: 50000
  // };
  // var selectHousingType = document.querySelector('#housing-type');
  // var selectHousingPrice = document.querySelector('#housing-price');
  // var selectHousingRooms = document.querySelector('#housing-rooms');
  // var selectHousingGuests = document.querySelector('#housing-guests');
  // var selectHousingFeatures = document.querySelector('#housing-features');

  // var getPriceValue = function (price) {
  //   if (price < Price.MIN) {
  //     return 'low';
  //   } else if (price > Price.MAX) {
  //     return 'high';
  //   } else {
  //     return 'middle';
  //   }
  // };


  // var filter = function (pins) {
  //   var pinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  //   var filteredPins = pins.filter(function (filteredPin) {
  //     if ((selectHousingType.value === 'any' || selectHousingType.value === filteredPin.offer.type) &&
  //       (selectHousingRooms.value === 'any' || parseInt(selectHousingRooms.value, 10) === filteredPin.offer.rooms) &&
  //       (selectHousingGuests.value === 'any' || parseInt(selectHousingGuests.value, 10) === filteredPin.offer.guests) &&
  //       (selectHousingPrice.value === 'any' || selectHousingPrice.value === getPriceValue(filteredPin.offer.price))) {

  //       return filteredPin;
  //     }
  //   });

  //   pinItems.forEach(function (item) {
  //     item.remove();
  //   });
  //   window.pin.addPinsToDOM(filteredPins, window.showCard)
  // };

  // window.blabla = function (pins) {
  //   selectHousingType.addEventListener('change', function () {
  //     filter(pins);
  //   });

  //   selectHousingRooms.addEventListener('change', function () {
  //     filter(pins);
  //   });

  //   selectHousingGuests.addEventListener('change', function () {
  //     filter(pins);
  //   });

  //   selectHousingPrice.addEventListener('change', function () {
  //     filter(pins);
  //   })
  // };


  var Price = {
    MIN: 10000,
    MAX: 50000
  };
  var selectHousingType = document.querySelector('#housing-type');
  var selectHousingPrice = document.querySelector('#housing-price');
  var selectHousingRooms = document.querySelector('#housing-rooms');
  var selectHousingGuests = document.querySelector('#housing-guests');
  // var selectHousingFeatures = document.querySelector('#housing-features');
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

  var foo = function (pins) {
    var pinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinItems.forEach(function (item) {
      item.remove();
    });
    window.pin.addPinsToDOM(filter(pins), window.showCard);
  };

  window.blabla = function (pins) {
    selectHousingType.addEventListener('change', function () {
      foo(pins);
    });

    selectHousingRooms.addEventListener('change', function () {
      foo(pins);
    });

    selectHousingGuests.addEventListener('change', function () {
      foo(pins);
    });

    selectHousingPrice.addEventListener('change', function () {
      foo(pins);
    });
  };
})();
