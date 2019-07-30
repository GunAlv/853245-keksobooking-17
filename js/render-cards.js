'use strict';

(function () {
  var ImageSize = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var translatedHousingType = {
    'house': 'Дома',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  var addCardFeatures = function (parentElementOfFeatures, cardFeatures) { // Костыльное решение
    var halfCLassOfElement = 'popup__feature--';
    parentElementOfFeatures.innerHTML = '';

    cardFeatures.forEach(function (cardFeature) {
      var fullClassOfElement = halfCLassOfElement + cardFeature;
      var newLi = document.createElement('li');
      newLi.classList.add('popup__feature');
      newLi.classList.add(fullClassOfElement);
      parentElementOfFeatures.appendChild(newLi);
    });

    if (cardFeatures.length === 0) {
      parentElementOfFeatures.remove();
    }
  };

  var addCardPhoto = function (parentElementOfImages, cardImages) {
    parentElementOfImages.innerHTML = '';

    cardImages.forEach(function (cardImage) {
      var newImg = document.createElement('img');
      newImg.classList.add('popup__photo');
      newImg.style.width = ImageSize.WIDTH + 'px';
      newImg.style.height = ImageSize.HEIGHT + 'px';
      newImg.alt = 'Фотография жилья';
      newImg.src = cardImage;
      parentElementOfImages.appendChild(newImg);
    });

    if (cardImages.length === 0) {
      parentElementOfImages.remove();
    }
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = translatedHousingType[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    addCardFeatures(cardElement.querySelector('.popup__features'), card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    addCardPhoto(cardElement.querySelector('.popup__photos'), card.offer.photos);

    return cardElement;
  };

  var createFragmentForCard = function (element) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(element));

    return fragment;
  };

  window.createFragmentForCard = createFragmentForCard;
})();
