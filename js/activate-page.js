'use strict';

(function () {
  var FORM_ON = false;
  var FORM_OFF = true;
  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var copiedData = [];
  var mapFillter = document.querySelector('.map__filters');

  var setPinMainLocationWithoutAngle = function () {
    window.pinMain.getLocation(FORM_OFF);
  };

  var setPinMainLocationWithAngle = function () {
    window.pinMain.getLocation(FORM_ON);
  };

  window.changeDisablingForm(FORM_OFF);
  setPinMainLocationWithoutAngle(); // Получить координаты главной метки без учета ее острого конца

  var onLoadSuccess = function (data) { // Добавление необходимых данных в случае успешного обращения на сервер
    copiedData = data.slice();
    window.pin.addPinsToDOM(copiedData, window.card.show); // Добавление меток
    window.mapShowFilteredPins(copiedData); // Фильтрация меток на карте
  };

  var onLoadError = function () { // Показать ошибку, если возникли проблемы с сервером
    window.popup.showErrorModal();
    window.changeDisablingForm(FORM_OFF);
  };

  var makePageActive = function () { // Активация страницы
    window.changeDisablingForm(FORM_ON); // Разблокировать формы
    window.backend.load(onLoadSuccess, onLoadError); // Загрузить данные меток из сервера
    window.util.removeClass(mapBlock, 'map--faded');
    window.util.removeClass(adForm, 'ad-form--disabled');
  };

  var checkMapClass = function () {
    if (mapBlock.classList.contains('map--faded')) {
      makePageActive();
    }
  };

  var resetPage = function () {
    adForm.reset();
    mapFillter.reset();
    window.changeDisablingForm(FORM_OFF);
    window.pinMain.returnToStart();
    window.pin.clearPins();
    window.card.remove();
    adForm.classList.add('ad-form--disabled');
    mapBlock.classList.add('map--faded');
  };

  window.activate = {
    makePageActive: makePageActive,
    checkMapClass: checkMapClass,
    setPinMainLocationWithoutAngle: setPinMainLocationWithoutAngle,
    setPinMainLocationWithAngle: setPinMainLocationWithAngle,
    resetPage: resetPage
  };
})();
