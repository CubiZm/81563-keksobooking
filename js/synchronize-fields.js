'use strict';

window.synchronizeFields = (function () {
  /**
   * Синхронизация различных полей
   * @param {HTMLElement} first - первый элемент для сравнения
   * @param {HTMLElement} second - второй элемент для сравнения
   * @param {Array} firstArray - массив свойств первого элемента
   * @param {Array} secondArray - массив свойств второвогоэлемента
   * @param {Function} callback - функция обратного вызова, которая осуществляет что-либо (н-р синхронизацию)
   */
  return function (first, second, firstArray, secondArray, callback) {
    first.addEventListener('change', function () {
      callback(first, second, firstArray, secondArray);
    });
  };
})();
