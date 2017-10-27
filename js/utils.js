'use strict';

(function () {

  /**
   * набор свойств для клавиш
   * @enum {number} KeyCode
   */
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout;

  window.utils = {

    /**
     * Генерирует рандомное число в заданном диапозоне
     * @param {number} min
     * @param {number} max
     *
     * @return {number}
     */
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    /**
     * Получает рандомный элемент из массива
     * @param {Array} array
     *
     * @return {*}
     */
    getRandomElement: function (array) {
      var index = Math.floor(this.getRandomNumber(0, array.length - 1));
      return array[index];
    },

    /**
     * Возвращает массив со случайными значениями заданной длины
     * @param {Array} array
     * @param {number} length
     * @param {boolean} unique - если true, то элементы уникальные
     *
     * @return {Array}
     */
    getRandomArray: function (array, length, unique) {
      var arr = [];

      while (arr.length < length) {
        var randomElement = this.getRandomElement(array);

        if (unique && ~arr.indexOf(randomElement)) {
          continue;
        } else {
          arr.push(randomElement);
        }
      }

      return arr;
    },

    isEscPressed: function (keyCode) {
      return keyCode === KeyCodes.ESC;
    },

    isEnterPressed: function (keyCode) {
      return keyCode === KeyCodes.ENTER;
    },

    debounce: function (callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    },
    loadFile: function (file, callback) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        callback(reader);
      });
      reader.readAsDataURL(file);
    }
  };
})();
