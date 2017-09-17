'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';

  var getData = function (onLoad, onError) {

    var dictErrors = {
      '200': function () {
        onLoad(xhr.response);
      },
      '400': function () {
        onError('Неверный запрос');
      },
      '404': function () {
        onError('Ничего не найдено');
      },
      '500': function () {
        onError('Сервер не отвечает');
      },
      'default': function () {
        onError('Неизвестный статус: ');
      }
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      (dictErrors[xhr.status] || dictErrors['default'])();
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000; // 5s

    return xhr;
  };


  window.backend = {
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
