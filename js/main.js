'use strict';
// var PHOTOS_WIDTH = 40;
// var PHOTOS_HEIGHT = 40;

var OFFERS_NUMBER = 8;
var PROPERTIES_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var AMOUNT = {
  ROOM: {
    MAX: 100,
    MIN: 1
  },
  GUEST: {
    MAX: 3,
    MIN: 1
  }
};

// var RU_PROPERTIES_TYPE = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало'
// };

// var MIN_AMOUNT_ROOM = 1;
// var MAX_AMOUNT_ROOM = 5;
// var MIN_AMOUNT_GUEST = 1;
// var MAX_AMOUNT_GUEST = 10;

var MAP_WIDTH = 1200;
var MAP_TOP_Y = 130;
var MAP_BOTTOM_Y = 630;

var CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// var RU_FEATURES = {
//   wifi: 'Беспроводной интернет',
//   dishwasher: 'Посудомойка',
//   parking: 'Парковка',
//   washer: 'Стиральная машина',
//   elevator: 'Лифт',
//   conditioner: 'Кондиционер',
// };

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -35;

var PX_CUT = -2;

var ENTER_KEY = 'Enter';

var VALIDITY_TEXT = {
  1: '1 комната — «для 1 гостя»',
  2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
  3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
  100: AMOUNT.ROOM.MAX + ' комнат — «не для гостей»'
};

var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
// var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var mapFiltersContainer = map.querySelector('.map__filters-container');
// var template = document.querySelector('#card').content.querySelector('.map__card');
var notice = document.querySelector('.notice');
var form = notice.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var inputs = form.querySelectorAll('input');
var selects = form.querySelectorAll('select');
var mapPinMain = document.querySelector('.map__pin--main');
var address = form.querySelector('#address');
var numberOfRoomsSelect = form.querySelector('#room_number');
var numberOfGuestsSelect = form.querySelector('#capacity');
var submitButton = notice.querySelector('.ad-form__submit');
var roomsNumber = numberOfRoomsSelect.value;
var guestsNumber = numberOfGuestsSelect.value;
var formElements = [
  fieldsets,
  inputs,
  selects
];

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateFeatures = function () {
  var unusedFeatures = FEATURES.slice();
  var features = [];

  if (features.length < unusedFeatures.length) {
    var index = getRandomIntInclusive(0, unusedFeatures.length);
    var feature = unusedFeatures.splice(index, 1);
    features.push(feature);
  }
  return features;
};

var getListOfOffers = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_NUMBER; i++) {
    offers[i] = createOffer(i + 1);
  }
  return offers;
};

var createOffer = function (offerNumber) {
  var locationX = getRandomIntInclusive(0, MAP_WIDTH);
  var locationY = getRandomIntInclusive(MAP_TOP_Y, MAP_BOTTOM_Y);
  var offer = {
    author: {
      avatar: 'img/avatars/user0' + (offerNumber) + '.png'
    },
    offer: {
      title: 'строка, заголовок предложения',
      address: locationX + ', ' + locationY,
      price: 1000,
      type: getRandomElement(PROPERTIES_TYPE),
      rooms: getRandomIntInclusive(AMOUNT.ROOM.MIN, AMOUNT.ROOM.MAX),
      guests: getRandomIntInclusive(AMOUNT.GUEST.MIN, AMOUNT.GUEST.MAX),
      checkin: getRandomElement(CHECKIN_TIMES),
      checkout: getRandomElement(CHECKOUT_TIMES),
      features: generateFeatures(),
      description: 'строка с описанием',
      photos: PHOTOS
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return offer;
};

var activateMap = function (element) {
  element.classList.remove('map--faded');
  var offers = getListOfOffers();
  renderPins(offers);
};

var createPin = function (offer) {
  var pinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var pin = pinTemplate.cloneNode(true);
  var pinX = offer.location.x + PIN_OFFSET_X;
  var pinY = offer.location.y + PIN_OFFSET_Y;
  pin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

  var pinAvatar = pin.querySelector('img');
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.offer.title;

  return pin;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < offers.length; j++) {
    fragment.appendChild(createPin(offers[j]));
  }
  mapPin.appendChild(fragment);
};
//
// var getEndingsRooms = function (number) {
//   if (number === 1) {
//     return ' комната';
//   }
//   return (number >= 2 && number <= 4) ? ' комнаты' : ' комнат';
// };
//
// var getEndingsGuests = function (number) {
//   return number === 1 ? ' гостя' : ' гостей';
// };
//
// var getRoomsGuestsCountText = function (rooms, guests) {
//   var endingWordRooms = getEndingsRooms(rooms);
//   var endingWordGuests = getEndingsGuests(guests);
//   var text = rooms + endingWordRooms + ' для ' + guests + endingWordGuests;
//   return text;
// };
//
// var getInOutTimeText = function (checkin, checkout) {
//   var text = 'Заезд после ' + checkin + ', выезд до ' + checkout;
//   return text;
// };
//
// var getPriceText = function (price) {
//   var text = price + ' ₽/ночь';
//   return text;
// };
//
// var generatePhotos = function (advertisement) {
//   var fragment = document.createDocumentFragment();
//
//   advertisement.forEach(function (element) {
//     var img = document.createElement('img');
//     img.className = 'popup__photo';
//     img.src = element;
//     img.alt = 'Фотография жилья';
//     img.width = PHOTOS_WIDTH;
//     img.height = PHOTOS_HEIGHT;
//     fragment.appendChild(img);
//   });
//   return fragment;
// };
//
// var createCard = function (advertisement) {
//   var card = template.cloneNode(true);
//
//   var title = card.querySelector('.popup__title');
//   title.textContent = advertisement.offer.title;
//
//   var address = card.querySelector('.popup__text--address');
//   address.textContent = advertisement.offer.address;
//
//   var price = card.querySelector('.popup__text--price');
//   var textPrice = getPriceText(advertisement.offer.price);
//   price.textContent = textPrice;
//
//   var type = card.querySelector('.popup__type');
//   type.textContent = RU_PROPERTIES_TYPE[advertisement.offer.type];
//
//   var capacity = card.querySelector('.popup__text--capacity');
//   var textRoomsAndGuests = getRoomsGuestsCountText(advertisement.offer.rooms, advertisement.offer.guests);
//   capacity.textContent = textRoomsAndGuests;
//
//   var time = card.querySelector('.popup__text--time');
//   var textTimeInOut = getInOutTimeText(advertisement.offer.checkin, advertisement.offer.checkout);
//   time.textContent = textTimeInOut;
//
//   var features = card.querySelector('.popup__features');
//   features.textContent = RU_FEATURES[advertisement.offer.features];
//
//   var description = card.querySelector('.popup__description');
//   description.textContent = advertisement.offer.description;
//
//   var photos = card.querySelector('.popup__photos');
//   photos.innerHTML = '';
//   photos.appendChild(generatePhotos(advertisement.offer.photos));
//
//   var avatar = card.querySelector('.popup__avatar');
//   avatar.src = advertisement.author.avatar;
//
//   var setPopupElementTextContent = card.querySelectorAll(':scope > *');
//   setPopupElementTextContent.forEach(function (element) {
//     if (!element.textContent) {
//       element.classList.add('visually-hidden');
//     }
//   });
//
//   return card;
// };
//
// var renderCard = function (card) {
//   map.insertBefore(card, mapFiltersContainer);
// };
//
// var card = createCard(offers[0]);
// renderCard(card);

var disableForm = function () {
  form.classList.add('ad-form--disabled');

  formElements.forEach(function (element) {
    element.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  });
};

var activateForm = function () {
  form.classList.remove('ad-form--disabled');

  formElements.forEach(function (element) {
    element.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  });
};

var setAddress = function (x, y) {
  address.value = x + ', ' + y;
};

var activatePage = function () {
  activateMap(map);
  activateForm();
};

var getPinCoordinateX = function () {
  return mapPinMain.style.left.slice(0, PX_CUT) - PIN_OFFSET_Y;
};

var getPinCoordinateY = function () {
  return mapPinMain.style.top.slice(0, PX_CUT) - PIN_OFFSET_X;
};

var validateRoomsCapacity = function (rooms, guests) {

  if ((guests > rooms && rooms !== AMOUNT.ROOM.MAX) || (rooms !== AMOUNT.ROOM.MAX && guests === 0) || (rooms === 100 && guests > 0)) {
    numberOfGuestsSelect.setCustomValidity(VALIDITY_TEXT[rooms]);
  } else {
    numberOfGuestsSelect.setCustomValidity('');
  }
};

disableForm();

mapPinMain.addEventListener('mousedown', function (e) {
  if (e.button === 0) {
    activatePage();

    var x = getPinCoordinateX();
    var y = getPinCoordinateY();

    setAddress(x, y);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();

    var x = getPinCoordinateX();
    var y = getPinCoordinateY();

    setAddress(x, y);
  }
});

numberOfRoomsSelect.addEventListener('change', function () {
  roomsNumber = parseInt(numberOfRoomsSelect.value, 10);
});

numberOfGuestsSelect.addEventListener('change', function () {
  guestsNumber = parseInt(numberOfGuestsSelect.value, 10);
  numberOfGuestsSelect.setCustomValidity('');
});

submitButton.addEventListener('click', function () {
  validateRoomsCapacity(roomsNumber, guestsNumber);
});

