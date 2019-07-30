'use strict';

(function () {
  var main = document.querySelector('main');

  // Модальное окно ошибки

  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorPopupTemplate.cloneNode(true);
  var buttonError = errorPopupTemplate.querySelector('.error__button');

  var openError = function () {
    main.appendChild(errorPopup);
  };

  var closeError = function () {
    main.removeChild(errorPopup);
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
    errorPopup.removeEventListener('click', onErrorModalClick);
  };

  // Модальное окно успеха

  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var successPopup = successPopupTemplate.cloneNode(true);

  var openSuccess = function () {
    main.appendChild(successPopup);
  };

  var closeSuccess = function () {
    main.removeChild(successPopup);
  };

  var onSucessPopupClose = function () {
    closeSuccess();
    successPopup.removeEventListener('click', onSucessPopupClose);
  };

  var onSucessPopupKeydown = function (evt) {
    window.util.isEscEvent(evt, closeSuccess);
    document.removeEventListener('keydown', onSucessPopupKeydown);
  };

  window.popup = {
    showErrorModal: function () {
      openError();
      errorPopup.addEventListener('click', onErrorModalClick);
      document.addEventListener('keydown', onErrorModalKeydown);
      buttonError.addEventListener('click', onButtonError);
    },

    showSuccessModal: function () {
      openSuccess();
      successPopup.addEventListener('click', onSucessPopupClose);
      document.addEventListener('keydown', onSucessPopupKeydown);
    }
  };
})();
