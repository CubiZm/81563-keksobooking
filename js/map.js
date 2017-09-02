'use strict';

window.map = (function () {

  var OFFERS = 8;

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  var adsArray = window.utils.getElementsArray(window.data.createObjectAd, OFFERS);

  /**
   * Создаёт HTML-фрагмент пинов по шаблону
   * @param {Array.<Ad>} array
   *
   * @return {HTMLElement}
   */
  var getPinNodes = function (array) {

    var fragment = document.createDocumentFragment();

    array.forEach(function (element) {
      fragment.appendChild(window.pin.createPin(element));
    });

    return fragment;
  };

  window.card.hideDialog();
  tokyoPinMap.appendChild(getPinNodes(adsArray));

})();
