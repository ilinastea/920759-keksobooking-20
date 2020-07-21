'use strict';

(function () {
  var main = document.querySelector('main');
  window.formSubmit = {
    showPopup: function (template) {
      var popup = template.cloneNode(true);
      main.appendChild(popup);
    },
    closePopupHandler: function (popup) {
      main.removeChild(popup);
    }
  };
})();
