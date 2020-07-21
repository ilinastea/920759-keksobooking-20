'use strict';

(function () {
  var MAX_PINS_COUNT = 5;
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormFields = noticeForm.querySelectorAll('fieldset');
  var noticeFilterForm = document.querySelector('.map__filters');
  var noticeFilters = noticeFilterForm.querySelectorAll('select, fieldset');
  var mainPinCoordinates = window.mainPinLocation.getDefault();

  window.pageDefault.setFieldsDisabled(noticeFormFields);
  window.pageDefault.setFieldsDisabled(noticeFilters);
  window.setPinAddress(mainPinCoordinates);

  var activatePage = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
    noticeForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
  };

  var loadedNotices = [];
  var successHandler = function (notices) {
    window.renderPins(notices, MAX_PINS_COUNT);
    loadedNotices = notices;
    window.filter(loadedNotices);
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      activatePage(noticeFormFields);
      activatePage(noticeFilters);
      window.loadData(successHandler, function () {});
    }
  };
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinClickHandler);
})();
