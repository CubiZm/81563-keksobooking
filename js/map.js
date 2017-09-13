'use strict';

window.map = (function () {

  var map = document.querySelector('.tokyo');
  var pinMain = document.querySelector('.pin__main');
  var address = document.querySelector('#address');

  /**
   * Параметры главного пина
   * @enum {number} PinImgParams
   */
  var PinImgParams = {
    WIDTH: 75,
    HEIGHT: 94
  };

  /**
   * Параметры карты и панели фильтров
   * @enum {number}  MapParams
   */
  var MapParams = {
    FILTER_HEIGTH: 46,
    HEADER_HEIGHT: 80,
    MAX_MAP_WIDTH: map.offsetWidth,
    MAX_MAP_HEIGHT: map.offsetHeight
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

      // на сколько сдвинулся курсор
      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      var maxCoordX = MapParams.MAX_MAP_WIDTH - PinImgParams.WIDTH / 2;
      var minCoordX = 0 - PinImgParams.WIDTH / 2;
      var maxCoordY = MapParams.MAX_MAP_HEIGHT - PinImgParams.HEIGHT - MapParams.FILTER_HEIGTH;
      var minCoordY = 0 + MapParams.HEADER_HEIGHT;

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

      address.value = (pinX + PinImgParams.WIDTH / 2) + ', ' + (pinY + PinImgParams.HEIGHT);

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
    window.filter(offers);
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
