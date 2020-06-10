'use strict';

//  создание данных
var offerTitles = ['Title1', 'Title2', 'Title3', 'Title4', 'Title5', 'Title6', 'Title7', 'Title8'];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckin = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//  вспомогательная функция
var random = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var createSimilarNotices = function () {
  var similarNotices = [];
  for (i = 0; i < 8; i++) {
    var notice = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: offerTitles[random(0, offerTitles.length - 1)],
        adress: '600, 350',
        price: random(5000, 15000),
        type: offerTypes[random(0, offerTypes.length - 1)],
        rooms: random(1, 4),
        guests: random(1, 4),
        checkin: offerCheckin[random(0, offerCheckin.length - 1)],
        checkout: offerCheckin[random(0, offerCheckin.length - 1)],
        features: offerFeatures.slice(0, random(1, offerFeatures.length - 1)),
        description: 'Здесь будет описание',
        photos: offerPhotos.slice(0, random(1, offerPhotos.length))
      },
      location: {
        x: random(100, 800),
        y: random(100, 500)
      }
    };
    similarNotices[i] = notice;
  }
  return similarNotices;
};

var notices = createSimilarNotices();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsBlock = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var newPin = mapPinTemplate.cloneNode(true);
  newPin.querySelector('img').src = pin.author.avatar;
  newPin.querySelector('img').alt = pin.offer.title;
  newPin.style = 'left: ' + (pin.location.x + 25) + 'px; top: ' + (pin.location.y + 70) + 'px;';
  return newPin;
};

var fragmentPins = document.createDocumentFragment();
for (var i = 0; i < notices.length; i++) {
  fragmentPins.appendChild(renderPin(notices[i]));
}
mapPinsBlock.appendChild(fragmentPins);

var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var addCard = function (card) {
  var newCard = mapCardTemplate.cloneNode(true);
  newCard.querySelector('.popup__avatar').src = card.author.avatar;
  newCard.querySelector('.popup__title').textContent = card.offer.title;
  newCard.querySelector('.popup__text--address').textContent = card.offer.adress;
  newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  newCard.querySelector('.popup__description').textContent = card.offer.description;
  map.insertBefore(newCard, document.querySelector('.map__filters-container'));
  return newCard;
};
var popup = addCard(notices[0]);

var addCardPhotos = function (card) {
  var photos = popup.querySelector('.popup__photos');
  var img = popup.querySelector('.popup__photo');
  img.src = card.offer.photos[0];
  if (card.offer.photos.length > 1) {
    for (i = 1; i < card.offer.photos.length; i++) {
      var newImg = img.cloneNode(true);
      photos.appendChild(newImg);
      newImg.src = card.offer.photos[i];
    }
  }
  return newImg;
};
addCardPhotos(notices[0]);

var addCardType = function (card) {
  var types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  popup.querySelector('.popup__type').textContent = types[card.offer.type];
};
addCardType(notices[0]);

var addCardFeatures = function (card) {
  var features = popup.querySelector('.popup__features');
  if (!card.offer.features.includes('wifi')) {
    features.removeChild(popup.querySelector('.popup__feature--wifi'));
  }
  if (!card.offer.features.includes('dishwasher')) {
    features.removeChild(popup.querySelector('.popup__feature--dishwasher'));
  }
  if (!card.offer.features.includes('parking')) {
    features.removeChild(popup.querySelector('.popup__feature--parking'));
  }
  if (!card.offer.features.includes('washer')) {
    features.removeChild(popup.querySelector('.popup__feature--washer'));
  }
  if (!card.offer.features.includes('elevator')) {
    features.removeChild(popup.querySelector('.popup__feature--elevator'));
  }
  if (!card.offer.features.includes('conditioner')) {
    features.removeChild(popup.querySelector('.popup__feature--conditioner'));
  }
  return features;
};
addCardFeatures(notices[0]);
