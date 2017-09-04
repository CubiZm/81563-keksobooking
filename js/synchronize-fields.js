'use strict';

window.synchronizeFields = (function () {
  return function (first, second, firstArray, secondArray, callfunction) {
    first.addEventListener('change', function () {
      callfunction(first, second, firstArray, secondArray);
    });
  };
})();
