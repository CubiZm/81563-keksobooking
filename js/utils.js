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

  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout;

  return {

    isEscPressed: function (keyCode) {
      return keyCode === keyCodes.ESC;
    },

    isEnterPressed: function (keyCode) {
      return keyCode === keyCodes.ENTER;
    },

    debounce: function (callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    }
  };
})();
