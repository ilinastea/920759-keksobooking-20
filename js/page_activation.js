'use strict';

(function () {
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormFields = noticeForm.querySelectorAll('fieldset');
  var noticeFilterForm = document.querySelector('.map__filters');
  var noticeFilters = noticeFilterForm.querySelectorAll('select, fieldset');
  var mainPinCoordinates = window.getMainPinCoordinates();

  var makeFieldsDisabled = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'true');
    }
  };
  makeFieldsDisabled(noticeFormFields);
  makeFieldsDisabled(noticeFilters);
  window.pinAddress(mainPinCoordinates);

  var makePageActive = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
    noticeForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      makePageActive(noticeFormFields);
      makePageActive(noticeFilters);
      window.addPins();
    }
  };
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinClickHandler);
})();
