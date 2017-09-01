'use strict';

window.createPin = (function () {
  var dialog = document.querySelector('.dialog');
  /**
   * Создаёт HTML-разметку пина
   * @param {Ad} pin
   *
   * @return {HTMLElement}
   */
  var createPinElement = function (pin) {

    var img = {
      WIDTH: 40,
      HEIGHT: 40,
      CLASS_NAME: 'rounded'
    };

    var PIN_CLASS_NAME = 'pin';
    var PIN_TAB_INDEX = '0';

    var pinBaloon = document.createElement('div');
    var imgElement = document.createElement('img');

    pinBaloon.className = PIN_CLASS_NAME;
    pinBaloon.style.left = pin.location.x - pinBaloon.offsetWidth + 'px';
    pinBaloon.style.top = pin.location.y - pinBaloon.offsetHeight + 'px';
    pinBaloon.tabIndex = PIN_TAB_INDEX;

    imgElement.className = img.CLASS_NAME;
    imgElement.src = pin.author.avatar;
    imgElement.width = img.WIDTH;
    imgElement.height = img.HEIGHT;

    pinBaloon.appendChild(imgElement);

    return pinBaloon;
  };

  return {
    /**
     * Создаёт пины
     * @param {Ad} ad
     *
     * @return {HTMLElement}
     */
    createPin: function (ad) {
      var node = createPinElement(ad);
      window.createPin.initPinHandlers(node, ad);

      return node;
    },
    /**
     * Создаёт HTML-фрагмент пинов по шаблону
     * @param {Array.<Ad>} pinsArray
     *
     * @return {HTMLElement}
     */
    getPinNodes: function (pinsArray) {

      var fragment = document.createDocumentFragment();

      pinsArray.forEach(function (element) {
        fragment.appendChild(window.createPin.createPin(element));
      });

      return fragment;
    },

    activatePin: function (pin) {
      pin.classList.add('pin--active');
    },

    deactivePin: function () {
      var activePin = document.querySelector('.pin--active');
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
    },
    openPinDialog: function (evt, ad) {
      var target = evt.currentTarget;
      var dialogPanel = dialog.querySelector('.dialog__panel');

      dialog.replaceChild(window.createCard.createAdNode(ad), dialogPanel);

      window.createPin.deactivePin();
      window.createPin.activatePin(target);
      window.createMap.initEventHandler();
      window.createMap.showDialog();
    },

    initPinHandlers: function (node, ad) {
      node.addEventListener('click', function (evt) {
        window.createPin.openPinDialog(evt, ad);
      });

      node.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.createDate.keyCodes.ENTER) {
          window.createPin.openPinDialog(evt, ad);
        }
      });
    }
  };
})();
