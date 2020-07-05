'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
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
})();
