'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var inputs = form.querySelectorAll('input');
  var selects = form.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');
  var avatar = document.querySelector('#avatar');
  var address = form.querySelector('#address');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');
  var roomsNumber = form.querySelector('#room_number');
  var guestsNumber = form.querySelector('#capacity');
  var images = form.querySelector('#images');
  var submitButton = form.querySelector('.ad-form__submit');
  var resetButton = form.querySelector('.ad-form__reset');

  var formElements = [
    fieldsets,
    inputs,
    selects
  ];

  var fillAddressInput = function () {
    var x = mainPin.offsetLeft + window.pin.offset.MAIN_PIN.X;
    var y = mainPin.offsetTop + window.pin.offset.MAIN_PIN.Y;
    address.value = x + ', ' + y;
  };

  var disable = function () {
    form.classList.add('ad-form--disabled');
    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];

      for (var j = 0; j < element.length; j++) {
        element[j].setAttribute('disabled', 'disabled');
      }
    }
    mapFilters.setAttribute('disabled', 'disabled');
    address.setAttribute('readonly', 'readonly');
  };

  var activate = function () {
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];
      for (var j = 0; j < element.length; j++) {
        element[j].removeAttribute('disabled');
      }
    }
    mapFilters.removeAttribute('disabled');
    title.setAttribute('required', 'required');
    title.setAttribute('minlength', window.data.amount.TITLE.MIN);
    title.setAttribute('maxlength', window.data.amount.TITLE.MAX);
    price.setAttribute('required', 'required');
    price.setAttribute('max', window.data.amount.PRICE.MAX);
    price.setAttribute('placeholder', window.data.PROPERTIES_MIN_PRICE[type.value]);
    images.setAttribute('accept', 'image/*');
    avatar.setAttribute('accept', 'image/*');
  };

  var onMouseClick = function (evt) {
    evt.preventDefault();
    form.reset();
    disable();
    window.map.disable();
    fillAddressInput();
    window.main.pageActivated = false;
  };

  var onEnterKeyDown = function (evt) {
    if (evt.key === window.utils.key.ENTER) {
      onMouseClick();
    }
  };

  resetButton.addEventListener('click', onMouseClick);
  resetButton.addEventListener('keydown', onEnterKeyDown);

  var onRoomOrGuestChange = function () {
    guestsNumber.setCustomValidity('');
    switch (roomsNumber.value) {
      case '1':
        if (guestsNumber.value !== '1') {
          guestsNumber.setCustomValidity(window.validation.validityText[roomsNumber.value]);
        }
        break;
      case '2':
        if (guestsNumber.value === '0' || guestsNumber.value === '3') {
          guestsNumber.setCustomValidity(window.validation.validityText[roomsNumber.value]);
        }
        break;
      case '3':
        if (guestsNumber.value === '0') {
          guestsNumber.setCustomValidity(window.validation.validityText[roomsNumber.value]);
        }
        break;
      case '100':
        if (guestsNumber.value !== '0') {
          guestsNumber.setCustomValidity(window.validation.validityText[roomsNumber.value]);
        }
        break;
    }
  };

  var onTypeOrPriceChange = function () {
    price.setCustomValidity('');
    price.setAttribute('placeholder', window.data.PROPERTIES_MIN_PRICE[type.value]);
    if (parseInt(price.value, 10) < window.data.PROPERTIES_MIN_PRICE[type.value]) {
      price.setCustomValidity(window.validation.validityText[type.value]);
    }
  };

  var onTimeInChange = function () {
    if (parseInt(timeout.value, 10) !== parseInt(timein.value, 10)) {
      timeout.value = timein.value;
    }
  };

  var onTimeOutChange = function () {
    if (parseInt(timein.value, 10) !== parseInt(timeout.value, 10)) {
      timein.value = timeout.value;
    }
  };

  type.addEventListener('change', onTypeOrPriceChange);
  price.addEventListener('change', onTypeOrPriceChange);
  timein.addEventListener('change', onTimeInChange);
  timeout.addEventListener('change', onTimeOutChange);
  roomsNumber.addEventListener('change', onRoomOrGuestChange);
  guestsNumber.addEventListener('change', onRoomOrGuestChange);

  window.form = {
    disable: disable,
    activate: activate,
    fillAddressInput: fillAddressInput,
    submitButton: submitButton
  };
})();
