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

  var getPriceToString = function (price) {
    if (price < Price.MIN) {
      return 'low';
    } else if (price > Price.MAX) {
      return 'high';
    } else {
      return 'middle';
    }
  };

  var filterStringValue = function (selectValue, pinOffer) {
    return selectValue === 'any' || parseInt(selectValue, 10) === pinOffer;
  };

  var filterValue = function (selectValue, pinOffer) {
    return selectValue === 'any' || selectValue === pinOffer;
  };

  var filterPrice = function (selectValue, pinOffer) {
    return selectValue === 'any' || selectValue === getPriceToString(pinOffer); // Преобразует цену из data в строковое выражение для сопоставление с input value
  };

  var checkFeaturesMatch = function (pinOffer, inputValue) { // Возвращает булево значение, если один массив включает в себе элемент другого массива
    return inputValue.every(function (everyInputValue) {
      return pinOffer.indexOf(everyInputValue) >= 0;
    });
  };

  var filtraion = function (pins) { // В конечном итоге функция будет возращать набор отфильрованных меток
    var checkboxCheckedFeatures = document.querySelectorAll('#housing-features input[type="checkbox"]:checked');
    var featureValuesFromInputs = []; // Динамически меняющийся массив, добавляющий value выбранного checbox

    var getFeatureValues = function () {
      checkboxCheckedFeatures.forEach(function (checkbox) {
        featureValuesFromInputs.push(checkbox.value);
      });
    };

    getFeatureValues();

    return pins.filter(function (pin) { // Фильтрация меток в соответствии заданным условиям

      return filterStringValue(selectHousingRooms.value, pin.offer.rooms) &&
      filterStringValue(selectHousingGuests.value, pin.offer.guests) &&
      filterValue(selectHousingType.value, pin.offer.type) &&
      filterPrice(selectHousingPrice.value, pin.offer.price) &&
      checkFeaturesMatch(pin.offer.features, featureValuesFromInputs);
    });
  };

  window.filtration = filtraion;
})();
