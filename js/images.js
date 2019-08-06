'use strict';

(function () {
  var TYPES = ['image/jpeg', 'image/png', 'image/gif'];
  var ImgSize = {
    WIDTH: 70,
    HEIGHT: 70
  };
  var MAX_IMAGE_QUANTITY = 9;

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var propertiesChooser = document.querySelector('.ad-form__input');
  var propertiesBlockForImage = document.querySelector('.ad-form__photo');
  var propertiesBlockContainer = document.querySelector('.ad-form__photo-container');

  var addImgToDOM = function (src) {
    var img = document.createElement('img');
    img.width = ImgSize.WIDTH;
    img.height = ImgSize.HEIGHT;
    img.src = src;

    if (propertiesBlockForImage.children.length === 0) {
      propertiesBlockForImage.appendChild(img);
    } else {
      var divImg = document.createElement('div');
      divImg.classList.add('ad-form__photo');
      divImg.appendChild(img);
      propertiesBlockContainer.appendChild(divImg);
    }

    if (propertiesBlockContainer.children.length >= MAX_IMAGE_QUANTITY) {
      propertiesChooser.disabled = 'true';
    }
  };

  var clearImgFromDOM = function () {
    while (propertiesBlockContainer.children.length >= 2) {
      propertiesBlockContainer.removeChild(propertiesBlockContainer.lastChild);
    }
  };

  var getAcceptedFile = function (file) {
    for (var i = 0; i < TYPES.length; i++) {
      if (file.type === TYPES[i]) {
        return file;
      }
    }

    return false;
  };

  var changeFileNameToLowerCase = function (file) {
    file.name.toLowerCase();
  };

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];

    var acceptedFile = getAcceptedFile(file);

    if (acceptedFile) {
      var reader = new FileReader();
      changeFileNameToLowerCase(acceptedFile);

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(acceptedFile);
    }
  });

  propertiesChooser.addEventListener('change', function () {
    var files = propertiesChooser.files;

    var acceptedFiles = Array.from(files).filter(function (it) {
      return getAcceptedFile(it);
    });

    if (acceptedFiles) {
      Array.from(acceptedFiles).forEach(function (it) {
        var reader = new FileReader();
        changeFileNameToLowerCase(it);
        reader.readAsDataURL(it);

        reader.addEventListener('load', function () {
          addImgToDOM(reader.result);
        });
      });
    }
  });


  var resetImgPreview = function () {
    clearImgFromDOM();
    avatarPreview.src = 'img/muffin-grey.svg';
  };

  window.resetImgPreview = resetImgPreview;
})();
