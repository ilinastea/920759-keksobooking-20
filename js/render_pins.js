'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var newPin = mapPinTemplate.cloneNode(true);
    newPin.querySelector('img').src = pin.author.avatar;
    newPin.querySelector('img').alt = pin.offer.title;
    newPin.style = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
    newPin.addEventListener('click', function () {
      window.pinInteraction.openCardHandler(pin, newPin);
    });
    return newPin;
  };

  var mapPinsBlock = document.querySelector('.map__pins');

  window.renderPins = function (notices, count) {
    var pins = mapPinsBlock.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      mapPinsBlock.removeChild(pins[i]);
    }
    var fragmentPins = document.createDocumentFragment();
    for (i = 0; i < count; i++) {
      fragmentPins.appendChild(renderPin(notices[i]));
    }
    mapPinsBlock.appendChild(fragmentPins);
  };

})();
