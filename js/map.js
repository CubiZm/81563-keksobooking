'use strict';

window.map = (function () {

  var OFFERS = 8;

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = document.querySelector('.pin__main');
  var address = document.querySelector('#address');

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

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    address.setAttribute('readonly', 'readonly');

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var pinImg = {
        WIDTH: 75,
        HEIGTH: 94
      };

      var startCoord = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      var location = {
        START_X: window.data.pinParams.START_X,
        END_X: window.data.pinParams.END_X,
        START_Y: window.data.pinParams.START_Y,
        END_Y: window.data.pinParams.END_Y
      };

      var currentCoords = {
        x: pinMain.offsetLeft - startCoord.x,
        y: pinMain.offsetTop - startCoord.y
      };

      var COORD_X_POSITION = location.START_X < startCoord.x && startCoord.x < location.END_X;
      var COORD_Y_POSITION = location.START_Y < startCoord.y && startCoord.y < location.END_Y;

      if (COORD_X_POSITION) {
        var x = startCoord.x + 'px';
      }

      if (COORD_Y_POSITION) {
        var y = startCoord.y + 'px';
      }

      pinMain.style.left = x;
      pinMain.style.top = y;

      address.value = 'x: ' + (currentCoords.x + pinImg.WIDTH) + ', y: ' + (currentCoords.y + pinImg.HEIGTH);

    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.card.hideDialog();
  tokyoPinMap.appendChild(getPinNodes(adsArray));

})();
