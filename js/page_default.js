'use strict';

(function () {
  window.pageDefault = {
    setFieldsDisabled: function (fields) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].setAttribute('disabled', 'true');
      }
    },

    setInactive: function () {
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
      var types = noticeForm.querySelector('#type');
      var price = noticeForm.querySelector('#price');
      var checkInTime = noticeForm.querySelector('#timein');
      var checkOutTime = noticeForm.querySelector('#timeout');
      var roomNumber = noticeForm.querySelector('#room_number');
      var guestNumber = noticeForm.querySelector('#capacity');
      var features = noticeForm.querySelectorAll('.feature__checkbox');
      var description = noticeForm.querySelector('#description');
      title.value = '';
      for (i = 0; i < types.length; i++) {
        if (types[i].value === 'flat') {
          types[i].selected = true;
        }
      }
      price.value = '';
      price.placeholder = 1000;
      for (i = 0; i < checkInTime.length; i++) {
        if (checkInTime[i].value === '12:00') {
          checkInTime[i].selected = true;
        }
      }
      for (i = 0; i < checkOutTime.length; i++) {
        if (checkOutTime[i].value === '12:00') {
          checkOutTime[i].selected = true;
        }
      }
      for (i = 0; i < roomNumber.length; i++) {
        if (roomNumber[i].value === '1') {
          roomNumber[i].selected = true;
        }
      }
      for (i = 0; i < guestNumber.length; i++) {
        if (guestNumber[i].value === '1') {
          guestNumber[i].selected = true;
        }
      }
      for (i = 0; i < features.length; i++) {
        features[i].checked = false;
      }
      description.value = '';
    }
  };
})();
