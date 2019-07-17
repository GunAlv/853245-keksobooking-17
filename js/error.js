'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var buttonError = errorTemplate.querySelector('.error__button');

  var closeError = function () {
    main.removeChild(errorTemplate);
  };

  var openError = function () {
    main.appendChild(errorTemplate);
  };

  var onButtonError = function () {
    closeError();
    buttonError.removeEventListener('click', onButtonError);
  };

  var onErrorModalKeydown = function (evt) {
    window.util.isEscEvent(evt, closeError);
    document.removeEventListener('keydown', onErrorModalKeydown);
  };

  window.showErrorModal = function () {
    openError();
    document.addEventListener('keydown', onErrorModalKeydown);
    buttonError.addEventListener('click', onButtonError);
  };
})();
