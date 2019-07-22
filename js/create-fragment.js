'use strict';

(function () {
  var DATA_QUANTITY = 5;

  var createFragment = function (elements, action) { // Создать и заполнить фрагмент метками
    var fragment = document.createDocumentFragment();
    var quantity = elements.length > DATA_QUANTITY ? DATA_QUANTITY : elements.length;

    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(action(elements[i]));
    }

    return fragment;
  };

  window.create = {
    fragment: createFragment,
  };
})();
