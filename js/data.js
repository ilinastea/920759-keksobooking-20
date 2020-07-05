'use strict';

(function () {
  var offerTitles = ['Title1', 'Title2', 'Title3', 'Title4', 'Title5', 'Title6', 'Title7', 'Title8'];
  var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
  var offerCheckin = ['12:00', '13:00', '14:00'];
  var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var random = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var createSimilarNotices = function () {
    var similarNotices = [];
    for (var i = 0; i < 8; i++) {
      var notice = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: offerTitles[random(0, offerTitles.length - 1)],
          adress: '600, 350',
          price: random(5000, 15000),
          type: offerTypes[random(0, offerTypes.length - 1)],
          rooms: random(1, 4),
          guests: random(1, 4),
          checkin: offerCheckin[random(0, offerCheckin.length - 1)],
          checkout: offerCheckin[random(0, offerCheckin.length - 1)],
          features: offerFeatures.slice(0, random(1, offerFeatures.length - 1)),
          description: 'Здесь будет описание',
          photos: offerPhotos.slice(0, random(1, offerPhotos.length))
        },
        location: {
          x: random(100, 800),
          y: random(100, 500)
        }
      };
      similarNotices[i] = notice;
    }
    return similarNotices;
  };

  window.data = {
    notices: createSimilarNotices()
  };
})();
