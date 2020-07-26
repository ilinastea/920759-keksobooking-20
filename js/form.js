'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var roomNumber = noticeForm.querySelector('#room_number');
  var guestNumber = noticeForm.querySelector('#capacity');

  var checkCapacity = function () {
    var roomsValue = roomNumber.value;
    var guestsValue = guestNumber.value;
    var isValid = true;

    if (roomsValue === '1' && guestsValue !== '1') {
      isValid = false;
    } else if (roomsValue === '2' && (guestsValue === '3' || guestsValue === '0')) {
      isValid = false;
    } else if (roomsValue === '3' && guestsValue === '0') {
      isValid = false;
    } else if (roomsValue === '100' && guestsValue !== '0') {
      isValid = false;
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

  var resetButton = noticeForm.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function () {
    window.resetPage();
  });

  var successPopup;
  var errorPopup;
  var successPopupHandler = function (evtS) {
    window.util.isEscEvent(evtS, function () {
      window.formSubmit.closeSuccessPopupHandler(successPopup);
    });
  };
  var errorPopupHandler = function (evtE) {
    window.util.isEscEvent(evtE, function () {
      window.formSubmit.closeErrorPopupHandler(errorPopup);
    });
  };

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (checkCapacity()) {
      window.upload(new FormData(noticeForm), function () {
        var succesTemplate = document.querySelector('#success').content.querySelector('.success');
        window.formSubmit.showPopup(succesTemplate);
        successPopup = document.querySelector('.success');
        successPopup.addEventListener('click', function () {
          window.formSubmit.closeSuccessPopupHandler(successPopup);
        });
        document.addEventListener('keydown', successPopupHandler);
      }, function () {
        var errorTemplate = document.querySelector('#error').content.querySelector('.error');
        window.formSubmit.showPopup(errorTemplate);
        errorPopup = document.querySelector('.error');
        errorPopup.addEventListener('click', function () {
          window.formSubmit.closeErrorPopupHandler(errorPopup);
        });
        document.addEventListener('keydown', errorPopupHandler);
      });
    }
  });
})();
