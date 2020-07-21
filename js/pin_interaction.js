'use strict';

(function () {
  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var openCard = function (notice, currentPin) {
    var openedCard = window.addCard(notice);
    var closeBtnCard = map.querySelector('.popup__close');

    closeBtnCard.addEventListener('click', function () {
      window.pinInteraction.closeCardHandler(openedCard, currentPin);
    });

    closeBtnCard.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, window.pinInteraction.closeCardHandler(openedCard, currentPin));
    });

    filters.addEventListener('change', function () {
      window.pinInteraction.closeCardHandler(openedCard, currentPin);
    });

  };

  window.pinInteraction = {
    openCardHandler: function (notice, currentPin) {
      var popup = map.querySelector('.popup');
      if (!popup) {
        openCard(notice, currentPin);
        currentPin.classList.add('map__pin--active');
      }
    },
    closeCardHandler: function (currentCard, currentPin) {
      map.removeChild(currentCard);
      currentPin.classList.remove('map__pin--active');
    }
  };
})();
