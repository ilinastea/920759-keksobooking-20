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
          return typeValue === 'any' || notice.offer.type === typeValue;
        })
        .filter(function (notice) {
          return roomsValue === 'any' || notice.offer.rooms === parseInt(roomsValue, 10);
        })
        .filter(function (notice) {
          return guestsValue === 'any' || notice.offer.guests === parseInt(guestsValue, 10);
        })
        .filter(function (notice) {
          if (priceValue === 'low') {
            return notice.offer.price < 10000;
          } else if (priceValue === 'high') {
            return notice.offer.price > 50000;
          } else if (priceValue === 'middle') {
            return (notice.offer.price >= 10000 && notice.offer.price <= 50000);
          }
          return true;
        })
        .filter(function (notice) {
          if (isFeatureChecked) {
            return notice.offer.features.includes(featuresValue);
          }
          return true;
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

    var checkValueHandler = function (value) {
      if (value === ANY_FILTER) {
        window.debounce(filterAllHandler(data));
      } else {
        window.debounce(filterHandler(type.value, rooms.value, guests.value, price.value, featuresChecked));
      }
    };

    type.addEventListener('change', function () {
      checkValueHandler(type.value);
    });

    rooms.addEventListener('change', function () {
      checkValueHandler(rooms.value);
    });

    guests.addEventListener('change', function () {
      checkValueHandler(guests.value);
    });

    price.addEventListener('change', function () {
      checkValueHandler(price.value);
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
