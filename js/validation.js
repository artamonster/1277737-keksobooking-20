'use strict';

(function () {

  var validityText = {
    1: '1 комната — «для 1 гостя»',
    2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    100: window.data.amount.ROOM.MAX + ' комнат — «не для гостей»',
    empty: 'test',
    bungalo: '«Бунгало» — минимальная цена за ночь ' + window.data.PROPERTIES_MIN_PRICE.bungalo,
    flat: '«Квартира» — минимальная цена за ночь ' + window.data.PROPERTIES_MIN_PRICE.flat,
    house: '«Дом» — минимальная цена ' + window.data.PROPERTIES_MIN_PRICE.house,
    palace: '«Дворец» — минимальная цена ' + window.data.PROPERTIES_MIN_PRICE.palace
  };


  // var validateRoomsCapacity = function (rooms, guests) {
  //
  //   if ((guests > rooms && rooms !== window.data.amount.ROOM.MAX) || (rooms !== window.data.amount.ROOM.MAX && guests === 0) || (rooms === 100 && guests > 0)) {
  //     window.form.numberOfGuestsSelect.setCustomValidity(VALIDITY_TEXT[rooms]);
  //     window.form.numberOfGuestsSelect.style.border = '1px solid red';
  //     return false;
  //   } else {
  //     window.form.numberOfGuestsSelect.setCustomValidity('');
  //     return true;
  //   }
  // };
  //
  // window.form.numberOfRoomsSelect.addEventListener('change', function () {
  //   window.form.roomsNumber = parseInt(window.form.numberOfRoomsSelect.value, 10);
  // });
  //
  // window.form.numberOfGuestsSelect.addEventListener('change', function () {
  //   window.form.guestsNumber = parseInt(window.form.numberOfGuestsSelect.value, 10);
  //   window.form.numberOfGuestsSelect.setCustomValidity('');
  // });

  window.validation = {
    validityText: validityText
  };

})();
