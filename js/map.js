'use strict';

window.map = (function () {

  var OFFERS = 8;

  var map = document.querySelector('.tokyo');
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

    // получили положение курсора в момент клика
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      /**
       * Параметры главного пина
       * @enum {number} pinImg
       */
      var pinImg = {
        WIDTH: 75,
        HEIGTH: 94
      };

      // на сколько сдвинулся курсор
      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      var maxMapWidth = map.offsetWidth;
      var maxMapHeight = map.offsetHeight;

      var maxCoordX = maxMapWidth - pinImg.WIDTH / 2;
      var minCoordX = 0 - pinImg.WIDTH / 2;
      var maxCoordY = maxMapHeight - pinImg.HEIGTH - 46;
      var minCoordY = 0;

      var pinY = pinMain.offsetTop - shift.y;
      var pinX = pinMain.offsetLeft - shift.x;

      // Проверяем координаты на «валидность», чтобы не вышли за пределы карты
      var checkCoordinates = function () {
        if (pinX > maxCoordX) {
          pinX = maxCoordX;
        }
        if (pinX < minCoordX) {
          pinX = minCoordX;
        }
        if (pinY > maxCoordY) {
          pinY = maxCoordY;
        }
        if (pinY < minCoordY) {
          pinY = minCoordY;
        }
      };

      checkCoordinates();

      // переопределяем стартовые координтаы
      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      pinMain.style.top = pinY + 'px';
      pinMain.style.left = pinX + 'px';

      address.value = 'x: ' + (pinX + pinImg.WIDTH / 2) + ', y: ' + (pinY + pinImg.HEIGTH);

    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  address.setAttribute('readonly', 'readonly');

  window.card.hideDialog();
  tokyoPinMap.appendChild(getPinNodes(adsArray));

})();
