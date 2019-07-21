'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filterContainer = document.querySelector('.map__filters-container');
  var ImageSize = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var translateHousingType = function (card) {
    var housingType;

    switch (card) {
      case 'house':
        housingType = 'Дом';
        break;
      case 'flat':
        housingType = 'Квартира';
        break;
      case 'bungalo':
        housingType = 'Бунгало';
        break;
      case 'palace':
        housingType = 'Дворец';
        break;
    }

    return housingType;
  };

  var addCardFeatures = function (parentElement, cardFeatures) { // Костыльное решение
    var halfOfClass = 'popup__feature--';
    parentElement.innerHTML = '';

    cardFeatures.forEach(function (cardFeature) {
      var fullOfClass = halfOfClass + cardFeature;
      var newLi = document.createElement('li');
      newLi.classList.add('popup__feature');
      newLi.classList.add(fullOfClass);
      parentElement.appendChild(newLi);
    });

    if (cardFeatures.length === 0) {
      parentElement.style.display = 'none';
    }
  };

  var addCardPhoto = function (parentElement, cardImages) {
    parentElement.innerHTML = '';

    cardImages.forEach(function (cardImage) {
      var newImg = document.createElement('img');
      newImg.classList.add('popup__photo');
      newImg.style.width = ImageSize.WIDTH + 'px';
      newImg.style.height = ImageSize.HEIGHT + 'px';
      newImg.alt = 'Фотография жилья';
      newImg.src = cardImage;
      parentElement.appendChild(newImg);
    });

    if (cardImages.length === 0) {
      parentElement.style.display = 'none';
    }
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = translateHousingType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    addCardFeatures(cardElement.querySelector('.popup__features'), card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    addCardPhoto(cardElement.querySelector('.popup__photos'), card.offer.photos);

    return cardElement;
  };

  var createFragment = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 1; i++) {
      fragment.appendChild(renderCard(cards[i]));
    }

    return fragment;
  };

  var addCardsToDOM = function (cards) {
    var mapBlock = document.querySelector('.map');
    mapBlock.insertBefore(createFragment(cards), filterContainer);
  };

  window.card = {
    addCardsToDOM: addCardsToDOM
  };
})();
