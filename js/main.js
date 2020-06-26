'use strict';

//  ===============создание данных===============
var offerTitles = ['Title1', 'Title2', 'Title3', 'Title4', 'Title5', 'Title6', 'Title7', 'Title8'];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckin = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

// ==========Деактивация страницы по умолчанию==============
var map = document.querySelector('.map');
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
// ============================================================

// ===================Активация страницы======================
var makePageActive = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled');
  }
  noticeForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
};

// ==================Определение адреса======================
var mapPinMain = document.querySelector('.map__pin--main');

var getMainPinCoordinates = function () {
  var locationMainPin = {
    location: {
      x: 0,
      y: 0
    }
  };
  var x = parseInt(mapPinMain.style.left.replace('px', ''), 10) + 25;
  var y = parseInt(mapPinMain.style.top.replace('px', ''), 10) + 70;
  locationMainPin.location.x = x;
  locationMainPin.location.y = y;
  return locationMainPin;
};

var mainPinCoordinates = getMainPinCoordinates();
var addressInput = noticeForm.querySelector('#address');

var setNoticeAddress = function (address) {
  addressInput.value = address.location.x + ', ' + address.location.y;
};
setNoticeAddress(mainPinCoordinates);

addressInput.addEventListener('keydown', function (evt) {
  evt.preventDefault();
});
// ============================================================

// =============Реализация меток объявлений на карте==============

var mapPinsBlock = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var newPin = mapPinTemplate.cloneNode(true);
  newPin.querySelector('img').src = pin.author.avatar;
  newPin.querySelector('img').alt = pin.offer.title;
  newPin.style = 'left: ' + (pin.location.x + 25) + 'px; top: ' + (pin.location.y + 70) + 'px;';
  newPin.addEventListener('click', function () {
    openCardHandler(pin, newPin);
  });
  newPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openCardHandler(pin, newPin);
    }
  });
  return newPin;
};

var addPins = function () {
  var fragmentPins = document.createDocumentFragment();
  for (var i = 0; i < notices.length; i++) {
    fragmentPins.appendChild(renderPin(notices[i]));
  }
  mapPinsBlock.appendChild(fragmentPins);
};

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var addCardPhotos = function (card, template) {
  var photos = template.querySelector('.popup__photos');
  var img = template.querySelector('.popup__photo');
  img.src = card.offer.photos[0];
  if (card.offer.photos.length > 1) {
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
var addCard = function (card) {
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

var openCard = function (notice, currentPin) {
  var openedCard = addCard(notice);
  var closeBtnCard = map.querySelector('.popup__close');
  closeBtnCard.addEventListener('click', function () {
    closeCardHandler(openedCard, currentPin);
  });
  closeBtnCard.addEventListener('keydown', function (evt) {
    if (evt.key === 'Esc') {
      closeCardHandler(openedCard, currentPin);
    }
  });
};

var openCardHandler = function (notice, currentPin) {
  var popup = map.querySelector('.popup');
  if (!popup) {
    openCard(notice, currentPin);
    currentPin.classList.add('map__pin--active');
  }
};

var closeCardHandler = function (currentCard, currentPin) {
  map.removeChild(currentCard);
  currentPin.classList.remove('map__pin--active');
};

var mainPinClickHandler = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    makePageActive(noticeFormFields);
    makePageActive(noticeFilters);
    setNoticeAddress(notices[0]);
    addPins();
  }
};
mapPinMain.addEventListener('mousedown', mainPinClickHandler);
mapPinMain.addEventListener('keydown', mainPinClickHandler);
// =========================================================

// ==================Валидация полей формы==================
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
    guestNumber.setCustomValidity('');
  }
});

guestNumber.addEventListener('change', function () {
  if (!checkCapacity()) {
    guestNumber.setCustomValidity('Выберете корректно');
  } else {
    roomNumber.setCustomValidity('');
    guestNumber.setCustomValidity('');
  }
});

noticeForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (checkCapacity()) {
    noticeForm.submit();
  }
});

var type = noticeForm.querySelector('#type');
var price = noticeForm.querySelector('#price');

type.addEventListener('change', function () {
  if (type.value === 'bungalo') {
    price.setAttribute('min', 0);
    price.placeholder = 0;
  }
  if (type.value === 'flat') {
    price.setAttribute('min', 1000);
    price.placeholder = 1000;
  }
  if (type.value === 'house') {
    price.setAttribute('min', 5000);
    price.placeholder = 5000;
  }
  if (type.value === 'palace') {
    price.setAttribute('min', 10000);
    price.placeholder = 10000;
  }
});

var checkInTime = noticeForm.querySelector('#timein');
var checkOutTime = noticeForm.querySelector('#timeout');

checkInTime.addEventListener('change', function () {
  var index = checkInTime.selectedIndex;
  checkOutTime[index].selected = true;
});

checkOutTime.addEventListener('change', function () {
  var index = checkOutTime.selectedIndex;
  checkInTime[index].selected = true;
});
