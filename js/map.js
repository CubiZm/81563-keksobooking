'use strict';

window.map = (function () {

  var map = document.querySelector('.tokyo');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = document.querySelector('.pin__main');
  var address = document.querySelector('#address');

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

      var filterPanelHeigth = 46;
      var headerPanelHeight = 80;

      var maxMapWidth = map.offsetWidth;
      var maxMapHeight = map.offsetHeight;

      var maxCoordX = maxMapWidth - pinImg.WIDTH / 2;
      var minCoordX = 0 - pinImg.WIDTH / 2;
      var maxCoordY = maxMapHeight - pinImg.HEIGTH - filterPanelHeigth;
      var minCoordY = 0 + headerPanelHeight;

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

      address.value = (pinX + pinImg.WIDTH / 2) + ', ' + (pinY + pinImg.HEIGTH);

    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var succesHandler = function (offers) {
    tokyoPinMap.appendChild(getPinNodes(offers));
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.className = 'error';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.card.hideDialog();

  window.backend.load(succesHandler, errorHandler);

})();
