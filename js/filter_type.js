'use strict';

(function () {
  window.filterType = function (data) {

    var MAX_PINS_COUNT = 5;


    var flatFilter = 'flat';
    var bungaloFilter = 'bungalo';
    var palaceFilter = 'palace';
    var houseFilter = 'house';
    var anyFilter = 'any';
    var filters = document.querySelector('.map__filters');
    var filterType = filters.querySelector('#housing-type');

    var filterTypeHandler = function (filterValue) {
      var mapPinsBlock = document.querySelector('.map__pins');
      var pins = mapPinsBlock.querySelectorAll('.map__pin');

      var typeNotices = data.filter(function (notice) {
        return notice.offer.type === filterValue;
      });

      for (var i = 1; i < pins.length; i++) {
        mapPinsBlock.removeChild(pins[i]);
      }
      window.renderPins(typeNotices, typeNotices.length);
    };

    var filterTypeAllHandler = function () {
      var mapPinsBlock = document.querySelector('.map__pins');
      var pins = mapPinsBlock.querySelectorAll('.map__pin');

      for (var i = 1; i < pins.length; i++) {
        mapPinsBlock.removeChild(pins[i]);
      }

      window.renderPins(data, MAX_PINS_COUNT);
    };

    filterType.addEventListener('change', function () {
      if (filterType.value === flatFilter) {
        filterTypeHandler(flatFilter, data);
      }
      if (filterType.value === bungaloFilter) {
        filterTypeHandler(bungaloFilter, data);
      }
      if (filterType.value === palaceFilter) {
        filterTypeHandler(palaceFilter, data);
      }
      if (filterType.value === houseFilter) {
        filterTypeHandler(houseFilter, data);
      }
      if (filterType.value === anyFilter) {
        filterTypeAllHandler(data);
      }

    });

  };
})();
