'use strict';

//  ===========создание данных===========
var offerTitles = ['Title1', 'Title2', 'Title3', 'Title4', 'Title5', 'Title6', 'Title7', 'Title8'];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckin = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//  ========вспомогательная функция========
var random = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var createSimilarNotices = function () {
  var similarNotices = [];
  for (var i = 0; i < 8; i++) {
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

// ===========Блок с отрисовкой похожих объявлений===========

// var mapPinsBlock = document.querySelector('.map__pins');
// var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
//
// var renderPin = function (pin) {
//   var newPin = mapPinTemplate.cloneNode(true);
//   newPin.querySelector('img').src = pin.author.avatar;
//   newPin.querySelector('img').alt = pin.offer.title;
//   newPin.style = 'left: ' + (pin.location.x + 25) + 'px; top: ' + (pin.location.y + 70) + 'px;';
//   return newPin;
// };
//
// var fragmentPins = document.createDocumentFragment();
// for (var i = 0; i < notices.length; i++) {
//   fragmentPins.appendChild(renderPin(notices[i]));
// }
// mapPinsBlock.appendChild(fragmentPins);
//
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// console.log(cardTemplate);
//
// var addCardPhotos = function (card, template) {
//   var photos = template.querySelector('.popup__photos');
//   var img = template.querySelector('.popup__photo');
//   img.src = card.offer.photos[0];
//   if (card.offer.photos.length > 1) {
//     for (i = 1; i < card.offer.photos.length; i++) {
//       var newImg = img.cloneNode(true);
//       photos.appendChild(newImg);
//       newImg.src = card.offer.photos[i];
//     }
//   }
// };
//
// var addCardType = function (card, template) {
//   var types = {
//     palace: 'Дворец',
//     flat: 'Квартира',
//     house: 'Дом',
//     bungalo: 'Бунгало'
//   };
//   template.querySelector('.popup__type').textContent = types[card.offer.type];
// };
//
// var addCardFeatures = function (card, template) {
//   var features = template.querySelector('.popup__features');
//   if (!card.offer.features.includes('wifi')) {
//     features.removeChild(template.querySelector('.popup__feature--wifi'));
//   }
//   if (!card.offer.features.includes('dishwasher')) {
//     features.removeChild(template.querySelector('.popup__feature--dishwasher'));
//   }
//   if (!card.offer.features.includes('parking')) {
//     features.removeChild(template.querySelector('.popup__feature--parking'));
//   }
//   if (!card.offer.features.includes('washer')) {
//     features.removeChild(template.querySelector('.popup__feature--washer'));
//   }
//   if (!card.offer.features.includes('elevator')) {
//     features.removeChild(template.querySelector('.popup__feature--elevator'));
//   }
//   if (!card.offer.features.includes('conditioner')) {
//     features.removeChild(template.querySelector('.popup__feature--conditioner'));
//   }
// };
//
// var addCard = function (card) {
//   var newCard = cardTemplate.cloneNode(true);
//   newCard.querySelector('.popup__avatar').src = card.author.avatar;
//   newCard.querySelector('.popup__title').textContent = card.offer.title;
//   newCard.querySelector('.popup__text--address').textContent = card.offer.adress;
//   newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
//   newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//   newCard.querySelector('.popup__description').textContent = card.offer.description;
//   map.insertBefore(newCard, document.querySelector('.map__filters-container'));
//   addCardType(card, newCard);
//   addCardFeatures(card, newCard);
//   addCardPhotos(card, newCard);
//   return newCard;
// };
// addCard(notices[0]);
// =================================================

// ============Деактивация полей форм===============
var noticeForm = document.querySelector('.ad-form');
var noticeFormFields = noticeForm.querySelectorAll('fieldset');
var noticeFilterForm = document.querySelector('.map__filters');
var noticeFilters = noticeFilterForm.querySelectorAll('select, fieldset');

var makeFieldsDisabled = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'true');
  }
};
makeFieldsDisabled(noticeFormFields);
makeFieldsDisabled(noticeFilters);
// =================================================

var makeFieldsEnabled = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled');
  }
  noticeForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
};

var mapPinMain = document.querySelector('.map__pin--main');

var getMainPinCoordinates = function () {
  var locationMainPin = {
    location: {
      x: 0,
      y: 0
    }
  };
  var x = parseInt(mapPinMain.style.left.replace('px', ''), 10) + 25;// найти .map__pin width?
  var y = parseInt(mapPinMain.style.top.replace('px', ''), 10) + 70;
  locationMainPin.location.x = x;
  locationMainPin.location.y = y;
  return locationMainPin;
};
var mainPinCoordinates = getMainPinCoordinates();

var setNoticeAddress = function (address) {
  var addressInput = document.querySelector('#address');
  addressInput.value = address.location.x + ', ' + address.location.y;
};
setNoticeAddress(mainPinCoordinates);

// =============обработчик клика главной метки==============
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    makeFieldsEnabled(noticeFormFields);
    makeFieldsEnabled(noticeFilters);
    setNoticeAddress(notices[0]);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    makeFieldsEnabled(noticeFormFields);
    makeFieldsEnabled(noticeFilters);
    setNoticeAddress(notices[0]);
  }
});
// =========================================================

// =============Проверка кол-ва комнат и гостей=============
var roomNumber = noticeForm.querySelector('#room_number');
var guestNumber = noticeForm.querySelector('#capacity');

var checkCapacity = function () {
  var roomsValue = roomNumber.value;
  var guestsValue = guestNumber.value;
  var isValid;

  if (roomsValue === '1' && guestsValue !== '1') {
    isValid = false;
  } else if (roomsValue === '2' && (guestsValue === '3' || guestsValue === '0')) {
    isValid = false;
  } else if (roomsValue === '3' && guestsValue === '0') {
    isValid = false;
  } else if (roomsValue === '100' && guestsValue !== '0') {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
};

roomNumber.addEventListener('change', function () {
  if (!checkCapacity()) {
    roomNumber.setCustomValidity('Выберете корректно');
  } else {
    roomNumber.setCustomValidity('');
  }

  // console.log('Кол-во комнат ' + roomNumber.value);
  // console.log('Кол-во гостей ' + guestNumber.value);
  // console.log(checkCapacity());
});

guestNumber.addEventListener('change', function () {
  if (!checkCapacity()) {
    guestNumber.setCustomValidity('Выберете корректно');
  } else {
    guestNumber.setCustomValidity('');
  }

  // console.log('Кол-во комнат ' + roomNumber.value);
  // console.log('Кол-во гостей ' + guestNumber.value);
  // console.log(checkCapacity());
});

noticeForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (checkCapacity()) {
    noticeForm.submit();
  }
});
