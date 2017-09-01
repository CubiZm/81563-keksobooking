'use strict';

window.createMap = (function () {

  var dialog = document.querySelector('.dialog');

  return {

    showDialog: function () {
      dialog.style.display = 'block';
    },

    hideDialog: function () {
      dialog.style.display = 'none';

      window.createMap.removeEventHandler();
    },

    onCloseWindowClick: function () {
      window.createMap.hideDialog();
      window.createPin.deactivePin();
    },

    initEventHandler: function () {
      var dialogClose = document.querySelector('.dialog__close');

      dialogClose.addEventListener('click', window.util.onCloseWindowClick);
      dialogClose.addEventListener('keydown', window.util.onCloseWindowKeydown);
      document.body.addEventListener('keydown', window.util.onDeactiveElements);
    },

    removeEventHandler: function () {
      var dialogClose = document.querySelector('.dialog__close');

      dialogClose.removeEventListener('click', window.util.onCloseWindowClick);
      dialogClose.removeEventListener('keydown', window.util.onCloseWindowKeydown);
      document.body.removeEventListener('keydown', window.util.onDeactiveElements);
    },
  };
})();
