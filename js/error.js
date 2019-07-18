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

  var onErrorModalClick = function () {
    closeError();
    errorTemplate.removeEventListener('click', onErrorModalClick);
  };

  window.showErrorModal = function () {
    openError();
    errorTemplate.addEventListener('click', onErrorModalClick);
    document.addEventListener('keydown', onErrorModalKeydown);
    buttonError.addEventListener('click', onButtonError);
  };
})();
