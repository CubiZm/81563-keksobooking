'use strict';

window.synchronizeFields = (function () {
  /**
   * Синхронизация различных полей
   * @param {ELement} first
   * @param {ELement} second
   * @param {Array} firstArray
   * @param {Array} secondArray
   * @param {Function} callfunction
   */
  return function (first, second, firstArray, secondArray, callfunction) {
    first.addEventListener('change', function () {
      callfunction(first, second, firstArray, secondArray);
    });
  };
})();
