'use strict';

(function () {
  var OFFERS_NUMBER = 8;
  // var PROPERTIES_TYPE = [
  //   'palace',
  //   'flat',
  //   'house',
  //   'bungalo'
  // ];
  var RU_PROPERTIES_TYPE = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var PROPERTIES_MIN_PRICE = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var amount = {
    ROOM: {
      MAX: 100,
      MIN: 1
    },
    GUEST: {
      MAX: 3,
      MIN: 1
    },
    PRICE: {
      MAX: 1000000
    },
    TITLE: {
      MIN: 30,
      MAX: 100
    }
  };
  var PHOTOS_WIDTH = 40;
  var PHOTOS_HEIGHT = 40;
  // var CHECKIN_TIMES = [
  //   '12:00',
  //   '13:00',
  //   '14:00'
  // ];
  //
  // var CHECKOUT_TIMES = [
  //   '12:00',
  //   '13:00',
  //   '14:00'
  // ];
  // var FEATURES = [
  //   'wifi',
  //   'dishwasher',
  //   'parking',
  //   'washer',
  //   'elevator',
  //   'conditioner'
  // ];

  var RU_FEATURES = {
    wifi: 'Беспроводной интернет',
    dishwasher: 'Посудомойка',
    parking: 'Парковка',
    washer: 'Стиральная машина',
    elevator: 'Лифт',
    conditioner: 'Кондиционер',
  };

  // var PHOTOS = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  // ];
  // var generateFeatures = function () {
  //   var unusedFeatures = FEATURES.slice();
  //   var features = [];
  //
  //   if (features.length < unusedFeatures.length) {
  //     var index = getRandomIntInclusive(0, unusedFeatures.length);
  //     var feature = unusedFeatures.splice(index, 1);
  //     features.push(feature);
  //   }
  //   return features;
  // };
  var getEndingsRooms = function (number) {
    if (number === 1) {
      return ' комната';
    }
    return (number >= 2 && number <= 4) ? ' комнаты' : ' комнат';
  };

  var getEndingsGuests = function (number) {
    return number === 1 ? ' гостя' : ' гостей';
  };

  var getRoomsGuestsCountText = function (rooms, guests) {
    var endingWordRooms = getEndingsRooms(rooms);
    var endingWordGuests = getEndingsGuests(guests);
    var text = rooms + endingWordRooms + ' для ' + guests + endingWordGuests;
    if (typeof rooms === 'number' && typeof guests === 'number') {
      return text;
    }
    return '';
  };

  var getInOutTimeText = function (checkin, checkout) {
    var text = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    if (typeof checkin === 'number' && typeof checkout === 'number') {
      return text;
    }
    return '';
  };

  var getPriceText = function (price) {
    var text = price + ' ₽/ночь';
    if (typeof price === 'number') {
      return text;
    }
    return '';
  };
  var generatePhotos = function (advertisement) {
    var fragment = document.createDocumentFragment();

    advertisement.forEach(function (element) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = element;
      img.alt = 'Фотография жилья';
      img.width = PHOTOS_WIDTH;
      img.height = PHOTOS_HEIGHT;
      fragment.appendChild(img);
    });
    return fragment;
  };

  // var createOffer = function (offerNumber) {
  //   var locationX = getRandomIntInclusive(0, MAP_WIDTH);
  //   var locationY = getRandomIntInclusive(MAP_TOP_Y, MAP_BOTTOM_Y);
  //   var offer = {
  //     author: {
  //       avatar: 'img/avatars/user0' + (offerNumber) + '.png'
  //     },
  //     offer: {
  //       title: 'строка, заголовок предложения',
  //       address: locationX + ', ' + locationY,
  //       price: 1000,
  //       type: getRandomElement(PROPERTIES_TYPE),
  //       rooms: getRandomIntInclusive(AMOUNT.ROOM.MIN, AMOUNT.ROOM.MAX),
  //       guests: getRandomIntInclusive(AMOUNT.GUEST.MIN, AMOUNT.GUEST.MAX),
  //       checkin: getRandomElement(CHECKIN_TIMES),
  //       checkout: getRandomElement(CHECKOUT_TIMES),
  //       features: generateFeatures(),
  //       description: 'строка с описанием',
  //       photos: PHOTOS
  //     },
  //     location: {
  //       x: locationX,
  //       y: locationY
  //     }
  //   };
  //   return offer;
  // };
  var getListOfOffers = function (data) {
    return window.utils.getMultipleRandomElements(data, OFFERS_NUMBER);
  };


  window.data = {
    OFFERS_NUMBER: OFFERS_NUMBER,
    // PROPERTIES_TYPE: PROPERTIES_TYPE,
    RU_PROPERTIES_TYPE: RU_PROPERTIES_TYPE,
    PROPERTIES_MIN_PRICE: PROPERTIES_MIN_PRICE,
    amount: amount,
    PHOTOS_WIDTH: PHOTOS_WIDTH,
    PHOTOS_HEIGHT: PHOTOS_HEIGHT,
    // CHECKIN_TIME: CHECKIN_TIME,
    // CHECKOUT_TIME: CHECKOUT_TIME,
    // FEATURES: FEATURES,
    RU_FEATURES: RU_FEATURES,
    // PHOTOS: PHOTOS,
    // generateFeatures: generateFeatures,
    getRoomsGuestsCountText: getRoomsGuestsCountText,
    getInOutTimeText: getInOutTimeText,
    getPriceText: getPriceText,
    generatePhotos: generatePhotos,
    // createOffer: createOffer,
    getListOfOffers: getListOfOffers
  };
})();
