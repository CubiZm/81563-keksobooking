'use strict';

window.pin = (function () {

  /**
   * Параметры изображения пина
   *
   * @enum {number|string} PinImgParams
   */
  var PinImgParams = {
    WIDTH: 40,
    HEIGHT: 40,
    CLASS_NAME: 'rounded'
  };

  var PIN_CLASS_NAME = 'pin';
  var PIN_TAB_INDEX = '0';

  /**
   * Создаёт HTML-разметку пина
   * @param {Ad} pin
   *
   * @return {HTMLElement}
   */
  var createPinElement = function (pin) {

    var pinBaloon = document.createElement('div');
    var imgElement = document.createElement('img');

    pinBaloon.className = PIN_CLASS_NAME;
    pinBaloon.style.left = pin.location.x - pinBaloon.offsetWidth / 2 + 'px';
    pinBaloon.style.top = pin.location.y - pinBaloon.offsetHeight + 'px';
    pinBaloon.tabIndex = PIN_TAB_INDEX;

    imgElement.className = PinImgParams.CLASS_NAME;
    imgElement.src = pin.author.avatar;
    imgElement.width = PinImgParams.WIDTH;
    imgElement.height = PinImgParams.HEIGHT;

    pinBaloon.appendChild(imgElement);

    return pinBaloon;
  };

  var activatePin = function (pin) {
    pin.classList.add('pin--active');
  };

  var openPinDialog = function (evt, ad) {
    var target = evt.currentTarget;

    window.pin.deactivePin();
    activatePin(target);
    window.card.showDialog(ad);
  };

  var initPinHandlers = function (node, ad) {
    node.addEventListener('click', function (evt) {
      openPinDialog(evt, ad);
    });

    node.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt.keyCode)) {
        openPinDialog(evt, ad);
      }
    });
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
      initPinHandlers(node, ad);
      return node;
    },

    deactivePin: function () {
      var activePin = document.querySelector('.pin--active');
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
    }
  };
})();
