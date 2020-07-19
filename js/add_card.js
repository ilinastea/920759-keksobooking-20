'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var addCardPhotos = function (card, template) {
    var photos = template.querySelector('.popup__photos');
    var img = template.querySelector('.popup__photo');
    if (card.offer.photos.length === 0) {
      photos.removeChild(img);
    } else {
      img.src = card.offer.photos[0];
      for (var i = 1; i < card.offer.photos.length; i++) {
        var newImg = img.cloneNode(true);
        photos.appendChild(newImg);
        newImg.src = card.offer.photos[i];
      }
    }
  };
  var addCardType = function (card, template) {
    var types = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };
    template.querySelector('.popup__type').textContent = types[card.offer.type];
  };
  var addCardFeatures = function (card, template) {
    var features = template.querySelector('.popup__features');
    if (!card.offer.features.includes('wifi')) {
      features.removeChild(template.querySelector('.popup__feature--wifi'));
    }
    if (!card.offer.features.includes('dishwasher')) {
      features.removeChild(template.querySelector('.popup__feature--dishwasher'));
    }
    if (!card.offer.features.includes('parking')) {
      features.removeChild(template.querySelector('.popup__feature--parking'));
    }
    if (!card.offer.features.includes('washer')) {
      features.removeChild(template.querySelector('.popup__feature--washer'));
    }
    if (!card.offer.features.includes('elevator')) {
      features.removeChild(template.querySelector('.popup__feature--elevator'));
    }
    if (!card.offer.features.includes('conditioner')) {
      features.removeChild(template.querySelector('.popup__feature--conditioner'));
    }
  };
  window.addCard = function (card) {
    var newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.popup__avatar').src = card.author.avatar;
    newCard.querySelector('.popup__title').textContent = card.offer.title;
    newCard.querySelector('.popup__text--address').textContent = card.offer.adress;
    newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    newCard.querySelector('.popup__description').textContent = card.offer.description;
    map.insertBefore(newCard, map.querySelector('.map__filters-container'));
    addCardType(card, newCard);
    addCardFeatures(card, newCard);
    addCardPhotos(card, newCard);
    return newCard;
  };
})();
