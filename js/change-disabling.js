'use strict';

(function () {
  var changeAttributeDisabled = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  window.changeDisablingForm = function (isDisable) { // Функция блокировки/открытия формы
    var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
    var mapFilterFieldsets = document.querySelectorAll('.map__filters fieldset');
    var mapFilterSelects = document.querySelectorAll('.map__filters select');
    changeAttributeDisabled(adFormFieldsets, isDisable);
    changeAttributeDisabled(mapFilterFieldsets, isDisable);
    changeAttributeDisabled(mapFilterSelects, isDisable);
  };
})();
