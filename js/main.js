'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var pageActivated = false;

  var onMainButtonMouseDown = function (downEvt) {
    downEvt.preventDefault();

    if (downEvt.button === window.utils.key.MOUSE_MAIN) {
      if (!window.main.pageActivated) {
        window.map.activate();
        window.form.activate();
        window.main.pageActivated = true;
      }

      var mouseStartCoord = {
        x: downEvt.clientX,
        y: downEvt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: mouseStartCoord.x - moveEvt.clientX,
          y: mouseStartCoord.y - moveEvt.clientY
        };

        mouseStartCoord = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mainPinCoord = {
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };

        mainPinCoord.x = (mainPinCoord.x < window.map.limit.LEFT) ? window.map.limit.LEFT : mainPinCoord.x;
        mainPinCoord.x = (mainPinCoord.x > window.map.limit.RIGHT) ? window.map.limit.RIGHT : mainPinCoord.x;
        mainPinCoord.y = (mainPinCoord.y < window.map.limit.TOP) ? window.map.limit.TOP : mainPinCoord.y;
        mainPinCoord.y = (mainPinCoord.y > window.map.limit.BOTTOM) ? window.map.limit.BOTTOM : mainPinCoord.y;

        window.pin.setPositionOnMap(mainPin, mainPinCoord.x, mainPinCoord.y);
      };

      var onMainButtonMouseUp = function (upEvt) {
        upEvt.preventDefault();
        if (!window.main.pageActivated) {
          window.map.activate();
          window.form.activate();
          window.main.pageActivated = true;
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMainButtonMouseUp);
        window.form.fillAddressInput();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMainButtonMouseUp);

    }
  };

  var onEnterKeyDown = function (evt) {
    if (evt.key === window.utils.key.ENTER) {
      window.map.activate();
      window.form.activate();
      window.form.fillAddressInput();
    }
  };

  window.form.fillAddressInput();
  window.form.disable();
  window.pin.mainPin.addEventListener('mousedown', onMainButtonMouseDown);
  window.pin.mainPin.addEventListener('keydown', onEnterKeyDown);

  window.main = {
    pageActivated: pageActivated
  };

})();
