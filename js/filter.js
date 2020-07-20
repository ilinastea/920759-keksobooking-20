'use strict';

(function () {
  window.filter = function (data) {

    var MAX_PINS_COUNT = 5;
    var ANY_FILTER = 'any';

    var filters = document.querySelector('.map__filters');
    var type = filters.querySelector('#housing-type');
    // var price = filters.querySelector('#housing-price');
    var rooms = filters.querySelector('#housing-rooms');
    var guests = filters.querySelector('#housing-guests');
    var features = filters.querySelector('#housing-features');
    var featuresCheckbox = filters.querySelectorAll('.map__checkbox');

    var filterHandler = function (typeValue, roomsValue, guestsValue, featuresValue) {

      // var filteredNotices = data
      // .filter(function (notice) {
      //   return notice.offer.type === typeValue;
      // })
      // .filter(function (notice) {
      //   return notice.offer.rooms === parseInt(roomsValue, 10);
      // })
      // .filter(function (notice) {
      //   return notice.offer.guests === parseInt(guestsValue, 10);
      // })
      // .filter(function (notice) {
      //   return notice.offer.features.includes(features);
      // })

      var typeNotices = data.filter(function (notice) {
        return notice.offer.type === typeValue;
      });

      var roomsNotices = data.filter(function (notice) {
        return notice.offer.rooms === parseInt(roomsValue, 10);
      });

      var guestsNotices = data.filter(function (notice) {
        return notice.offer.guests === parseInt(guestsValue, 10);
      });

      var featuresNotices = data.filter(function (notice) {
        return notice.offer.features.includes(featuresValue);
      });

      var filteredNotices = (typeNotices.concat(roomsNotices).concat(guestsNotices).concat(featuresNotices));
      window.renderPins(filteredNotices, filteredNotices.length);

    };

    var featuresChecked;

    var filterAllHandler = function () {
      window.renderPins(data, MAX_PINS_COUNT);
    };

    type.addEventListener('change', function () {
      if (type.value === ANY_FILTER) {
        filterAllHandler(data);
      } else {
        filterHandler(type.value, rooms.value, guests.value, featuresChecked);
      }
    });

    rooms.addEventListener('change', function () {
      if (rooms.value === ANY_FILTER) {
        filterAllHandler(data);
      } else {
        filterHandler(type.value, rooms.value, guests.value, featuresChecked);
      }
    });

    guests.addEventListener('change', function () {
      if (guests.value === ANY_FILTER) {
        filterAllHandler(data);
      } else {
        filterHandler(type.value, rooms.value, guests.value, featuresChecked);
      }
    });

    features.addEventListener('change', function () {

      for (var i = 0; i < featuresCheckbox.length; i++) {
        if (featuresCheckbox[i].checked === true) {
          featuresChecked = featuresCheckbox[i].value;
          filterHandler(type.value, rooms.value, guests.value, featuresChecked);
        }
      }

    });
  };
})();
