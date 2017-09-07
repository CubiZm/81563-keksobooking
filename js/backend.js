'use strict';

window.backend = (function () {
  var URL = 'https://1510.dump.academy/keksobooking';

  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        case 500:
          error = 'Сервер не отвечает';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000; // 5s

    return xhr;
  };


  return {
    load: function (onLoad, onError) {
      var xhr = getData(onLoad, onError);

      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = getData(onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
