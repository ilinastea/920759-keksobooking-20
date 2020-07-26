'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (mainPin.offsetTop < 46) {
          mainPin.style.top = 46 + 'px';
        } else if (mainPin.offsetTop > 546) {
          mainPin.style.top = 546 + 'px';
        } else {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }

        if (mainPin.offsetLeft < -31) {
          mainPin.style.left = -31 + 'px';
        } else if (mainPin.offsetLeft > 1169) {
          mainPin.style.left = 1169 + 'px';
        } else {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        }

        var mainPinCoords = window.mainPinLocation.getActive();
        window.setPinAddress(mainPinCoords);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
