'use strict';

(function () {
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var newPin = mapPinTemplate.cloneNode(true);
    newPin.querySelector('img').src = pin.author.avatar;
    newPin.querySelector('img').alt = pin.offer.title;
    newPin.style = 'left: ' + (pin.location.x + 25) + 'px; top: ' + (pin.location.y + 70) + 'px;';
    newPin.addEventListener('click', function () {
      window.pinInteraction.openCardHandler(pin, newPin);
    });
    newPin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.pinInteraction.openCardHandler(pin, newPin));
    });
    return newPin;
  };

  window.addPins = function () {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < window.data.notices.length; i++) {
      fragmentPins.appendChild(renderPin(window.data.notices[i]));
    }
    mapPinsBlock.appendChild(fragmentPins);
  };
})();
