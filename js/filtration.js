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

  var filterStringValue = function (selectValue, dataValue) {
    return selectValue === 'any' || parseInt(selectValue, 10) === dataValue;
  };

  var filterValue = function (selectValue, dataValue) {
    return selectValue === 'any' || selectValue === dataValue;
  };

  var filterPrice = function (selectValue, dataValue) {
    return selectValue === 'any' || selectValue === getPriceToString(dataValue); // Преобразует цену из data в строковое выражение для сопоставление с input value
  };

  var checkFeaturesMatch = function (dataValue, inputValue) { // Возвращает булево значение, если один массив включает в себе элемент другого массива
    return inputValue.every(function (everyInputValue) {
      return dataValue.indexOf(everyInputValue) >= 0;
    });
  };

  var filtraion = function (pins) { // В конечном итоге функция будет возращать набот отфильрованных меток
    var filteredPins = pins;

    var checkboxCheckedFeatures = document.querySelectorAll('#housing-features input[type="checkbox"]:checked');
    var featureValuesFromInputs = []; // Динамически меняющийся массив, добавляющий value выбранного checbox

    var getFeatureValues = function () {
      checkboxCheckedFeatures.forEach(function (checkbox) {
        featureValuesFromInputs.push(checkbox.value);
      });
    };

    getFeatureValues();

    return filteredPins.filter(function (filteredPin) { // Фильтрация меток в соответствии заданным условиям
      return filterStringValue(selectHousingRooms.value, filteredPin.offer.rooms) &&
      filterStringValue(selectHousingGuests.value, filteredPin.offer.guests) &&
      filterValue(selectHousingType.value, filteredPin.offer.type) &&
      filterPrice(selectHousingPrice.value, filteredPin.offer.price) &&
      checkFeaturesMatch(filteredPin.offer.features, featureValuesFromInputs);
    });
  };

  window.filtration = filtraion;
})();
