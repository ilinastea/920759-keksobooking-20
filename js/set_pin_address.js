'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var addressInput = noticeForm.querySelector('#address');

  window.setPinAddress = function (address) {
    addressInput.value = address.location.x + ', ' + address.location.y;
  };
  addressInput.readOnly = true;
})();
