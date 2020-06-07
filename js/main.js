'use strict';

//  создание данных
var offerTitles = ['Title1', 'Title2', 'Title3', 'Title4', 'Title5', 'Title6', 'Title7', 'Title8'];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckin = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
        price: random(5000, 100000),
        type: offerTypes[random(0, offerTypes.length - 1)],
        rooms: random(1, 4),
        guests: random(1, 4),
        checkin: offerCheckin[random(0, offerCheckin.length - 1)],
        checkout: offerCheckin[random(0, offerCheckin.length - 1)],
        features: offerFeatures.slice(0, random(1, offerFeatures.length - 1)),
        description: '',
        photos: offerPhotos.slice(0, random(1, offerPhotos.length - 1))
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

var fragment = document.createDocumentFragment();
for (var i = 0; i < notices.length; i++) {
  fragment.appendChild(renderPin(notices[i]));
}
mapPinsBlock.appendChild(fragment);
