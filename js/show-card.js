'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');

  var removeCard = function () {
    var card = mapBlock.querySelector('.map__card');

    if (card) {
      card.remove();
    }
  };

  var createCard = function (element, callback) {
    var createdFragment = window.createFragmentForCard(element);
    mapBlock.insertBefore(createdFragment, filterContainer);

    var buttonCloseCard = document.querySelector('.popup__close');

    callback(buttonCloseCard);
  };

  var closeCard = function (btn) {
    var onBtnCloseClick = function () {
      removeCard();
      btn.removeEventListener('click', onBtnCloseClick);
    };

    var onBtnCloseKeydownEnter = function (evt) {
      window.util.isEnterEvent(evt, removeCard);
      btn.removeEventListener('keydown', onBtnCloseKeydownEnter);
    };

    var onDocumentCloseKeydownEsc = function (evt) {
      window.util.isEscEvent(evt, removeCard);
      document.removeEventListener('keydown', onDocumentCloseKeydownEsc);
    };

    btn.addEventListener('click', onBtnCloseClick);
    btn.addEventListener('keydown', onBtnCloseKeydownEnter);
    document.addEventListener('keydown', onDocumentCloseKeydownEsc);
  };

  var showCard = function (pins, mapPins) {
    mapPins.forEach(function (mapPin, index) {
      mapPin.addEventListener('click', function () {
        window.pin.deactivatePin();

        mapPin.classList.add('map__pin--active');

        removeCard();
        createCard(pins[index], closeCard);
      });
    });
  };

  window.showCard = showCard;
})();
