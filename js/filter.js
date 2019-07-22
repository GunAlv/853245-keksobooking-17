'use strict';

(function () {
  var selectHousingType = document.querySelector('#housing-type');

  var getFilteredHousingTypePins = function (data) {
    window.pin.removePinsFromDOM();

    var filteredData = data.filter(function (it) {
      return it.offer.type === selectHousingType.value;
    });

    if (selectHousingType.value === 'any') {
      window.pin.addPinsToDOM(data);
    } else {
      window.pin.addPinsToDOM(filteredData);
    }
  };

  var filtrationMap = function (data) {
    selectHousingType.addEventListener('change', function () {
      getFilteredHousingTypePins(data);
    });
  };

  window.filter = {
    filtrationMap: filtrationMap
  };
})();
