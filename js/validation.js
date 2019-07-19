'use strict';

(function () {
  var selectType = document.querySelector('#type');
  var selectTimein = document.querySelector('#timein');
  var selectTimeout = document.querySelector('#timeout');

  var getMinPrice = function (selectedOption) { // Изменить минимальную цену в зависимости от выбранного типа жилья
    var price = document.querySelector('#price');
    var propertyPrice = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    var keys = Object.keys(propertyPrice);

    for (var i = 0; i < keys.length; i++) {
      if (selectedOption === keys[i]) {
        price.min = propertyPrice[keys[i]];
      }
    }
  };

  selectType.addEventListener('change', function () {
    var selectedOption = selectType.value;
    getMinPrice(selectedOption);
  });

  var onSelectTimeinChange = function () {
    selectTimeout.value = selectTimein.value;
  };

  var onSelectTimeoutChange = function () {
    selectTimein.value = selectTimeout.value;
  };

  selectTimein.addEventListener('change', onSelectTimeinChange);
  selectTimeout.addEventListener('change', onSelectTimeoutChange);
})();
