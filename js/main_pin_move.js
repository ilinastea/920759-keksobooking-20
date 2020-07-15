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

        if (mainPin.offsetTop < 130) {
          mainPin.style.top = 130 + 'px';
        } else if (mainPin.offsetTop > 630) {
          mainPin.style.top = 630 + 'px';
        } else {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }

        if (mainPin.offsetLeft < 0) {
          mainPin.style.left = 0 + 'px';
        } else if (mainPin.offsetLeft > 1130) {
          mainPin.style.left = 1130 + 'px';
        } else {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        var mainPinCoords = window.mainPinLocation.getActive();
        window.setPinAddress(mainPinCoords);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
