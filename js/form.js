'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormFields = noticeForm.querySelectorAll('fieldset');
  var noticeFilterForm = document.querySelector('.map__filters');
  var noticeFilters = noticeFilterForm.querySelectorAll('select, fieldset');
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

  var types = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');

  types.addEventListener('change', function () {
    if (types.value === 'bungalo') {
      price.setAttribute('min', 0);
      price.placeholder = 0;
    }
    if (types.value === 'flat') {
      price.setAttribute('min', 1000);
      price.placeholder = 1000;
    }
    if (types.value === 'house') {
      price.setAttribute('min', 5000);
      price.placeholder = 5000;
    }
    if (types.value === 'palace') {
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
    window.pageDefault.setFieldsDisabled(noticeFormFields);
    window.pageDefault.setFieldsDisabled(noticeFilters);
    window.pageDefault.setInactive();
  });

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (checkCapacity()) {
      window.upload(new FormData(noticeForm), function () {
        var succesTemplate = document.querySelector('#success').content.querySelector('.success');
        window.formSubmit.showPopup(succesTemplate);
        var successPopup = document.querySelector('.success');
        successPopup.addEventListener('click', function () {
          window.formSubmit.closePopupHandler(successPopup);
        });
        successPopup.addEventListener('keydown', function () {
          if (evt.key === 'Esc') {
            window.formSubmit.closePopupHandler(successPopup);
          }
        });
      }, function () {
        var errorTemplate = document.querySelector('#error').content.querySelector('.error');
        window.formSubmit.showPopup(errorTemplate);
        var errorPopup = document.querySelector('.error');
        var errorButton = errorPopup.querySelector('.error__button');
        errorPopup.addEventListener('click', function () {
          window.formSubmit.closePopupHandler(errorPopup);
        });
        errorButton.addEventListener('click', function () {
          window.formSubmit.closePopupHandler(errorPopup);
        });
      });
    }
    window.pageDefault.setFieldsDisabled(noticeFormFields);
    window.pageDefault.setFieldsDisabled(noticeFilters);
    window.pageDefault.setInactive();
  });
})();
