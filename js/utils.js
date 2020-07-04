'use strict';

(function () {
  var key = {
    MOUSE_MAIN: 0,
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getMultipleRandomElements = function (arr, n) {
    var originalArray = arr;
    var modifiedArray = [];
    for (var i = 0; i < n; i++) {
      var element = getRandomElement(originalArray);
      modifiedArray.push(element);
      var index = originalArray.indexOf(element);
      originalArray.splice(index, 1);
    }
    return modifiedArray;
  };


  // var getRandomIntInclusive = function (min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  window.utils = {
    key: key,
    getRandomElement: getRandomElement,
    getMultipleRandomElements: getMultipleRandomElements,
    // getRandomIntInclusive: getRandomIntInclusive
  };
})();
