'use strict';

(function () {
  var main = document.querySelector('main');
  window.formSubmit = {
    showPopup: function (template) {
      var popup = template.cloneNode(true);
      main.appendChild(popup);
    },
    closeErrorPopupHandler: function (popup) {
      main.removeChild(popup);
    },
    closeSuccessPopupHandler: function (popup) {
      main.removeChild(popup);
      window.resetPage();
    }
  };
})();
