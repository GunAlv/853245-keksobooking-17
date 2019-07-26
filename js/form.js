'use strict';

(function () {
  var mapFillter = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var selectType = document.querySelector('#type');
  var selectTimein = document.querySelector('#timein');
  var selectTimeout = document.querySelector('#timeout');
  var selectRomms = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');

  var PropertyPrice = {
    'BUNGALO': 0,
    'FLAT': 1000,
    'HOUSE': 5000,
    'PALACE': 10000
  };

  var RoomCounts = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var getMinPrice = function () {
    var price = document.querySelector('#price');
    var typeValue = selectType.value.toUpperCase();

    price.min = PropertyPrice[typeValue];
    price.placeholder = PropertyPrice[typeValue];
  };

  var onSelectType = function () {
    getMinPrice();
  };

  var onSelectTimeinChange = function () {
    selectTimeout.value = selectTimein.value;
  };

  var onSelectTimeoutChange = function () {
    selectTimein.value = selectTimeout.value;
  };

  var setCapacityOption = function () {
    selectCapacity.value = RoomCounts[selectRomms.value][0];

    Array.from(selectCapacity.options).forEach(function (item) {
      item.disabled = RoomCounts[selectRomms.value].indexOf(item.value) === -1;
    });
  };

  getMinPrice();
  setCapacityOption();

  var onSelectRoomsChange = function () {
    setCapacityOption();
  };

  selectType.addEventListener('change', onSelectType);
  selectRomms.addEventListener('change', onSelectRoomsChange);
  selectTimein.addEventListener('change', onSelectTimeinChange);
  selectTimeout.addEventListener('change', onSelectTimeoutChange);

  var resetPage = function () {
    adForm.reset();
    mapFillter.reset();
    window.card.remove();
  };

  var onSaveSuccess = function () {
    resetPage();
    adForm.classList.add('ad-form--disabled');
    window.popup.showSuccessModal();
  };

  var onSaveError = function () {
    window.popup.showErrorModal();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSaveSuccess, onSaveError);
    evt.preventDefault();
  });
})();
