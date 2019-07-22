'use strict';

(function () {
  var showCard = function (mapPins) {
    mapPins.forEach(function (mapPin) {
      mapPin.addEventListener('click', function () {
        var cards;
        if (!cards) {
          cards = document.querySelectorAll('article.map__card');
        }

        for (var i = 0; i < cards.length; i++) {
          cards[i].style.display = 'none';

          if (mapPin.children[0].src === cards[i].children[0].src) {
            cards[i].style.display = 'block';
          }
        }
      });
    });
  };
  window.showCard = showCard;
})();
