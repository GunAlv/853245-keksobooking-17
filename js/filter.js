'use strict';

(function () {
  var selectHousingType = document.querySelector('#housing-type');

  selectHousingType.addEventListener('change', function () {
    window.pin.removePinsFromDOM();

    var filteredData = window.data.filter(function (it) {
      return it.offer.type === selectHousingType.value;
    });

    if (selectHousingType.value === 'any') {
      window.pin.addPinsToDOM(window.data);
    } else {
      window.pin.addPinsToDOM(filteredData);
    }
  });
})();
