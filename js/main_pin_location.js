'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  window.mainPinLocation = {

    getDefault: function () {
      var locationDeafult = {
        location: {
          x: 0,
          y: 0
        }
      };
      var x = parseInt(mainPin.style.left.replace('px', ''), 10) + 33; // по умолчанию размер 65*65, центр метки
      var y = parseInt(mainPin.style.top.replace('px', ''), 10) + 33;
      locationDeafult.location.x = x;
      locationDeafult.location.y = y;
      return locationDeafult;
    },
    getActive: function () {
      var locationActive = {
        location: {
          x: 0,
          y: 0
        }
      };
      var x = parseInt(mainPin.style.left.replace('px', ''), 10) + 31; // в активном состоняии размер 62*62
      var y = parseInt(mainPin.style.top.replace('px', ''), 10) + 84; // учитывается длина острого конца
      locationActive.location.x = x;
      locationActive.location.y = y;
      return locationActive;
    }
  };
})();
