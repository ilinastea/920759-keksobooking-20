'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var getMainPinLocation = function (left, top) {
    var location = {
      location: {
        x: 0,
        y: 0
      }
    };

    var x = parseInt(mainPin.style.left.replace('px', ''), 10) + left;
    var y = parseInt(mainPin.style.top.replace('px', ''), 10) + top;

    if (mainPin.offsetLeft < -31) {
      x = 0;
    } else if (mainPin.offsetLeft > 1169) {
      x = 1200;
    }

    if (mainPin.offsetTop < 46) {
      y = 130;
    } else if (mainPin.offsetTop > 546) {
      y = 630;
    }

    location.location.x = x;
    location.location.y = y;


    return location;
  };

  window.mainPinLocation = {
    getDefault: function () {
      return getMainPinLocation(33, 33);
    },
    getActive: function () {
      return getMainPinLocation(31, 84);
    }
  };
})();
