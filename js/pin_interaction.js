'use strict';

(function () {
  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var openedCard;

  var escPressHandler = function (evtP) {
    window.util.isEscEvent(evtP, function () {
      window.pinInteraction.closeCardHandler(openedCard);
    });
  };

  var filterChangeHandler = function () {
    window.pinInteraction.closeCardHandler(openedCard);
  };

  var openCard = function (notice) {
    openedCard = window.addCard(notice);
    var closeBtnCard = map.querySelector('.popup__close');

    closeBtnCard.addEventListener('click', function () {
      window.pinInteraction.closeCardHandler(openedCard);
    });

    document.addEventListener('keydown', escPressHandler);

    filters.addEventListener('change', filterChangeHandler);

  };

  var closeCard = function (card, pin) {
    map.removeChild(card);
    pin.classList.remove('map__pin--active');
  };

  window.pinInteraction = {
    openCardHandler: function (notice, currentPin) {
      var popup = map.querySelector('.popup');
      var activePin = map.querySelector('.map__pin--active');
      if (!popup) {
        openCard(notice, currentPin);
        currentPin.classList.add('map__pin--active');
      } else {
        closeCard(popup, activePin);
        openCard(notice, currentPin);
        currentPin.classList.add('map__pin--active');
      }
    },
    closeCardHandler: function (currentCard) {
      var activePin = map.querySelector('.map__pin--active');
      closeCard(currentCard, activePin);

      document.removeEventListener('keydown', escPressHandler);
      filters.removeEventListener('change', filterChangeHandler);
    }
  };
})();
