'use strict';

(function () {
  window.pageDefault = {
    setFieldsDisabled: function (fields) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].setAttribute('disabled', 'true');
      }
    },

    deactivate: function () {
      var map = document.querySelector('.map');
      var mapPinsBlock = document.querySelector('.map__pins');
      var mainPin = document.querySelector('.map__pin--main');
      var pins = document.querySelectorAll('.map__pin');
      map.classList.add('map--faded');
      for (var i = 1; i < pins.length; i++) {
        mapPinsBlock.removeChild(pins[i]);
      }
      mainPin.style.left = '570px';
      mainPin.style.top = '375px';
      var mainPinCoordinates = window.mainPinLocation.getDefault();
      window.setPinAddress(mainPinCoordinates);

      var noticeForm = document.querySelector('.ad-form');
      noticeForm.classList.add('ad-form--disabled');

      var title = noticeForm.querySelector('#title');
      var type = noticeForm.querySelector('#type');
      var price = noticeForm.querySelector('#price');
      var checkInTime = noticeForm.querySelector('#timein');
      var checkOutTime = noticeForm.querySelector('#timeout');
      var roomNumber = noticeForm.querySelector('#room_number');
      var guestNumber = noticeForm.querySelector('#capacity');
      var features = noticeForm.querySelectorAll('.feature__checkbox');
      var description = noticeForm.querySelector('#description');
      title.value = '';
      type.value = 'flat';
      price.value = '';
      price.placeholder = 1000;
      checkInTime.value = '12:00';
      checkOutTime.value = '12:00';
      roomNumber.value = 1;
      guestNumber.value = 1;
      for (i = 0; i < features.length; i++) {
        features[i].checked = false;
      }
      description.value = '';
      var filters = document.querySelector('.map__filters');
      var featuresCheckbox = filters.querySelectorAll('.map__checkbox');
      for (i = 0; i < filters.length; i++) {
        filters[i].value = 'any';
      }
      for (i = 0; i < featuresCheckbox.length; i++) {
        featuresCheckbox[i].checked = false;
      }
    }
  };
})();
