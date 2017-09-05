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

  /**
   * Набор свойств для комнат: значение — количество гостей,
   * ключ — массив с количеством доступных комнат
   *
   * @enum {Array} objRooms
   */
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
    second.value = secondArray[firstArray.indexOf(first.value)];
  };

  var selectType = function () {
    priceInput.value = dictTypePrice[type.value];
    priceInput.min = dictTypePrice[type.value];
  };

  var onSyncOptions = function () {
    var options = capacity.querySelectorAll('option');

    options.forEach(function (element) {
      element.disabled = !(objRooms[rooms.value].includes(element.value));
    });
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

  onSyncOptions();
  // слушает изменения на различных инпутах и синхронизирует их.
  window.synchronizeFields(timeIn, timeOut, timeValues, timeValues, syncElements);
  window.synchronizeFields(timeOut, timeIn, timeValues, timeValues, syncElements);
  window.synchronizeFields(type, priceInput, roomsValues, capacityValues, selectType);
  window.synchronizeFields(rooms, capacity, roomsValues, capacityValues, syncElements);
  window.synchronizeFields(rooms, capacity, roomsValues, capacityValues, onSyncOptions);

  form.addEventListener('invalid', onInvalideForm, true);
  form.addEventListener('submit', onSubmitForm);
})();
