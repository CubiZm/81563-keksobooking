'use strict';

window.util = (function () {
  return {

    onDeactiveElements: function (evt) {
      if (evt.keyCode === window.createDate.keyCodes.ESC) {
        window.createMap.hideDialog();
        window.createPin.deactivePin();
      }
    },

    onCloseWindowClick: function () {
      window.createMap.hideDialog();
      window.createPin.deactivePin();
    },

    onCloseWindowKeydown: function (evt) {
      if (evt.keyCode === window.createDate.keyCodes.ENTER || evt.keyCode === window.createDate.keyCodes.ESC) {
        window.createMap.hideDialog();
        window.createPin.deactivePin();
      }
    },

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
      var index = Math.floor(window.util.getRandomNumber(0, array.length - 1));
      return array[index];
    },

    /**
     * Возвращает строку с адресом картинки
     * @param {number} number
     *
     * @return {string}
     */
    getImagePath: function (number) {
      return number > 9 ? 'img/avatars/user' + number + '.png' : 'img/avatars/user' + '0' + number + '.png';
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
        var randomElement = window.util.getRandomElement(array);

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
     * @param {number} arrayLength
     *
     * @return {Array}
     */
    getElementsArray: function (arrayLength) {
      var array = [];

      for (var j = 0; j < arrayLength; j++) {
        array.push(window.createDate.createObjectAd());
      }

      return array;
    }
  };
})();
