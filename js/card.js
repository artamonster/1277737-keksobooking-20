'use strict';

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var create = function (advertisement) {
    var card = template.cloneNode(true);
    card.querySelector('.popup__title').textContent = advertisement.offer.title;
    card.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    card.querySelector('.popup__text--price').textContent = window.data.getPriceText(advertisement.offer.price);
    card.querySelector('.popup__type').textContent = window.data.RU_PROPERTIES_TYPE[advertisement.offer.type];

    var capacity = card.querySelector('.popup__text--capacity');
    capacity.textContent = window.data.getRoomsGuestsCountText(advertisement.offer.rooms, advertisement.offer.guests);

    var time = card.querySelector('.popup__text--time');
    time.textContent = window.data.getInOutTimeText(advertisement.offer.checkin, advertisement.offer.checkout);

    var features = card.querySelector('.popup__features');
    features.textContent = window.data.RU_FEATURES[advertisement.offer.features];

    card.querySelector('.popup__description').textContent = advertisement.offer.description;
    card.querySelector('.popup__photos').innerHTML = window.data.generatePhotos(advertisement.offer.photos);
    card.querySelector('.popup__avatar').src = advertisement.author.avatar;

    var setPopupElementTextContent = card.querySelectorAll('popup__text');
    setPopupElementTextContent.forEach(function (element) {
      if (!element.textContent) {
        element.classList.add('visually-hidden');
      }
    });

    return card;
  };

  var close = function (evt) {
    if (evt.key === window.utils.key.ESCAPE || evt.button === window.utils.key.MOUSE_MAIN) {
      var mapCard = document.querySelector('.map__card');
      mapCard.remove();
      removeEventListener('click', close);
      removeEventListener('keydown', close);
    }
  };

  var render = function (offer) {
    var card = create(offer);
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    map.insertBefore(card, mapFiltersContainer);
    var buttonClose = document.querySelector('.popup__close');
    buttonClose.addEventListener('click', close);
    document.addEventListener('keydown', close);
  };

  window.card = {
    create: create,
    render: render
  };

})();
