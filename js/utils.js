'use strict';

window.utils = (function () {

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

  return {

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
    }
  };
})();
