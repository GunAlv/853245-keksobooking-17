'use strict';

(function () {
  var selectHousingType = document.querySelector('#housing-type');

  selectHousingType.addEventListener('change', function (evt) {
    window.pin.removePinsFromDOM();

    var selectedOption = evt.target.value;

    if (selectedOption === 'any') {
      window.pin.addPinsToDOM(window.data);
    }

    var filteredData = window.data.filter(function (it) {
      return it.offer.type === selectedOption;
    });

    window.pin.addPinsToDOM(filteredData);
  });
})();
