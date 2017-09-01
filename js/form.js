'use strict';

window.createForm = (function () {
  var form = document.querySelector('.notice__form');

  var priceInput = document.querySelector('#price');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');


  var dictTypePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomsValues = [
    '100',
    '1',
    '2',
    '3',
  ];

  var capacityValues = [
    '0',
    '1',
    '2',
    '3'
  ];

  var timeValues = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var objRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  /**
   * Синхронизирует второе значение с первым. При необходимости — с первым по совпадению индекса в массиве
   *
   * @param {HTMLElement} first
   * @param {HTMLElement} second
   * @param {Array} firstArray
   * @param {Array} secondArray
   */
  var syncElements = function (first, second, firstArray, secondArray) {
    second.value = first.value;

    second.value = secondArray[firstArray.indexOf(first.value)];
  };

  var selectType = function () {
    if (priceInput.value === '1000') {
      priceInput.value = dictTypePrice[type.value];
    }
    priceInput.min = dictTypePrice[type.value];
  };

  var onSyncOptions = function () {
    var options = capacity.querySelectorAll('option');

    for (var i = 0; i < options.length; i++) {
      options[i].disabled = !(objRooms[rooms.value].includes(options[i].value));
    }
  };

  var onInvalideForm = function (evt) {
    evt.preventDefault();
    evt.target.classList.add('invalid');
  };

  var onSubmitForm = function () {
    var invalidElements = form.querySelectorAll('.invalid');

    [].forEach.call(invalidElements, function (element) {
      element.classList.remove('invalid');
    });
  };

  // слушает изменения на различных инпутах и синхронизирует их. Bind позволяет добавить контекст вызова this в функцию, которая у нас равна null, и передать заданный набор аргументов
  timeIn.addEventListener('change', syncElements.bind(null, timeIn, timeOut, timeValues, timeValues));
  timeOut.addEventListener('change', syncElements.bind(null, timeOut, timeIn));
  type.addEventListener('change', selectType);
  rooms.addEventListener('change', syncElements.bind(null, rooms, capacity, roomsValues, capacityValues));
  rooms.addEventListener('change', onSyncOptions);

  form.addEventListener('invalid', onInvalideForm, true);
  form.addEventListener('submit', onSubmitForm);
})();
