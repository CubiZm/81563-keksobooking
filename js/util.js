'use strict';

window.utils = (function () {

  /**
   * набор свойств для клавиш
   * @enum {number} keyCode
   */
  var keyCodes = {
    ESC: 27,
    ENTER: 13
  };

  return {

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
    /**
     * Создаёт массив с заданным количеством объектов (пинов) в нём
     *
     * @param {Function} getObj - функция возвращающая объект
     * @param {number} arrayLength
     *
     * @return {Array}
     */
    getElementsArray: function (getObj, arrayLength) {
      var array = [];

      for (var i = 0; i < arrayLength; i++) {
        array.push(getObj(i));
      }

      return array;
    },

    isEscPressed: function (keyCode) {
      return keyCode === keyCodes.ESC;
    },

    isEnterPressed: function (keyCode) {
      return keyCode === keyCodes.ENTER;
    }
  };
})();
