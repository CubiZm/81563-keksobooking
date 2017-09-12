'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  var lastTimeout;

  return {
    debounceItem: function (callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    }
  };
})();
