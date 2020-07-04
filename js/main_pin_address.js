'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  var getMainPinCoordinates = function () {
    var locationMainPin = {
      location: {
        x: 0,
        y: 0
      }
    };
    var x = parseInt(mapPinMain.style.left.replace('px', ''), 10) + 25;
    var y = parseInt(mapPinMain.style.top.replace('px', ''), 10) + 70;
    locationMainPin.location.x = x;
    locationMainPin.location.y = y;
    return locationMainPin;
  };

  window.mainPinAddress = {
    mainPinCoordinates: getMainPinCoordinates()
  };
})();
