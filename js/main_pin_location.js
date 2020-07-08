'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  window.getMainPinCoordinates = function () {
    var locationMainPin = {
      location: {
        x: 0,
        y: 0
      }
    };
    var x = parseInt(mainPin.style.left.replace('px', ''), 10) + 25;
    var y = parseInt(mainPin.style.top.replace('px', ''), 10) + 70;
    locationMainPin.location.x = x;
    locationMainPin.location.y = y;
    return locationMainPin;
  };
})();
