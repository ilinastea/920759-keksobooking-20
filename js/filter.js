'use strict';

(function () {
  window.filter = function (data) {
    var MAX_PINS_COUNT = 5;
    var ANY_FILTER = 'any';

    var filters = document.querySelector('.map__filters');
    var type = filters.querySelector('#housing-type');
    var price = filters.querySelector('#housing-price');
    var rooms = filters.querySelector('#housing-rooms');
    var guests = filters.querySelector('#housing-guests');
    var features = filters.querySelector('#housing-features');
    var featuresCheckbox = filters.querySelectorAll('.map__checkbox');

    var filterHandler = function (typeValue, roomsValue, guestsValue, priceValue, featuresValue) {

      var isFeatureChecked = false;
      for (var i = 0; i < featuresCheckbox.length; i++) {
        if (featuresCheckbox[i].checked === true) {
          isFeatureChecked = true;
        }
      }

      var filteredNotices = data
        .filter(function (notice) {
          return typeValue === 'any' ? true : notice.offer.type === typeValue;
        })
        .filter(function (notice) {
          return roomsValue === 'any' ? true : notice.offer.rooms === parseInt(roomsValue, 10);
        })
        .filter(function (notice) {
          return guestsValue === 'any' ? true : notice.offer.guests === parseInt(guestsValue, 10);
        })
        .filter(function (notice) {
          if (priceValue === 'any') {
            return true;
          } else if (priceValue === 'low') {
            return notice.offer.price < 10000;
          } else if (priceValue === 'high') {
            return notice.offer.price > 50000;
          } else if (priceValue === 'middle') {
            return (notice.offer.price >= 10000 && notice.offer.price <= 50000);
          }
        })
        .filter(function (notice) {
          if (!isFeatureChecked) {
            return true;
          } else {
            return notice.offer.features.includes(featuresValue);
          }
        });

      if (filteredNotices.length < MAX_PINS_COUNT) {
        window.renderPins(filteredNotices.concat(data), MAX_PINS_COUNT);
      } else {
        window.renderPins(filteredNotices, MAX_PINS_COUNT);
      }

    };

    var featuresChecked;

    var filterAllHandler = function () {
      window.renderPins(data, MAX_PINS_COUNT);
    };

    type.addEventListener('change', function () {
      if (type.value === ANY_FILTER) {
        window.debounce(filterAllHandler(data));
      } else {
        window.debounce(filterHandler(type.value, rooms.value, guests.value, price.value, featuresChecked));
      }
    });

    rooms.addEventListener('change', function () {
      if (rooms.value === ANY_FILTER) {
        window.debounce(filterAllHandler(data));
      } else {
        window.debounce(filterHandler(type.value, rooms.value, guests.value, price.value, featuresChecked));
      }
    });

    guests.addEventListener('change', function () {
      if (guests.value === ANY_FILTER) {
        window.debounce(filterAllHandler(data));
      } else {
        window.debounce(filterHandler(type.value, rooms.value, guests.value, price.value, featuresChecked));
      }
    });

    price.addEventListener('change', function () {
      if (price.value === ANY_FILTER) {
        window.debounce(filterAllHandler(data));
      } else {
        window.debounce(filterHandler(type.value, rooms.value, guests.value, price.value, featuresChecked));
      }
    });

    features.addEventListener('change', function () {
      for (var i = 0; i < featuresCheckbox.length; i++) {
        if (featuresCheckbox[i].checked === true) {
          featuresChecked = featuresCheckbox[i].value;
          window.debounce(filterHandler(type.value, rooms.value, guests.value, price.value, featuresChecked));
        }
      }
    });
  };
})();
