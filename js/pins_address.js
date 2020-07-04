'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var addressInput = noticeForm.querySelector('#address');

  window.pinAddress = function (address) {
    addressInput.value = address.location.x + ', ' + address.location.y;
  };

  addressInput.addEventListener('keydown', function (evt) {
    evt.preventDefault();
  });
})();
