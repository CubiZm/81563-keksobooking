'use strict';

window.form = (function () {

  /**
   * Параметры полей формы
   * @enum {Array} formValues
   */
  var formValues = {
    ROOMS: [
      '100',
      '1',
      '2',
      '3',
    ],
    CAPACITY: [
      '0',
      '1',
      '2',
      '3'
    ],
    TIMES: [
      '12:00',
      '13:00',
      '14:00'
    ]
  };

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
    'house': 10000,
    'palace': 10000
  };

  /**
   * Набор свойств для комнат: значение — количество гостей,
   * ключ — массив с количеством доступных комнат
   *
   * @enum {Array} RoomsDictType
   */
  var RoomsDictType = {
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
    priceInput.min = dictTypePrice[type.value];
  };

  var onSyncOptions = function () {
    var options = capacity.querySelectorAll('option');

    options.forEach(function (element) {
      element.disabled = !(RoomsDictType[rooms.value].includes(element.value));
    });
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.className = 'error';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var succesHandler = function () {
    var invalidElements = form.querySelectorAll('.invalid');

    [].forEach.call(invalidElements, function (element) {
      element.classList.remove('invalid');
    });
    priceInput.min = '0';
    form.reset();
  };

  var onInvalideForm = function (evt) {
    evt.preventDefault();

    evt.target.classList.add('invalid');

    evt.target.addEventListener('change', function (e) {
      e.target.classList.remove('invalid');
    });
  };

  var onSubmitForm = function (evt) {

    evt.preventDefault();

    window.backend.save(new FormData(form), succesHandler, errorHandler);
  };

  onSyncOptions();

  // слушает изменения на различных инпутах и синхронизирует их.
  window.synchronizeFields(timeIn, timeOut, formValues.TIMES, formValues.TIMES, syncElements);
  window.synchronizeFields(timeOut, timeIn, formValues.TIMES, formValues.TIMES, syncElements);
  window.synchronizeFields(type, priceInput, formValues.ROOMS, formValues.CAPACITY, selectType);
  window.synchronizeFields(rooms, capacity, formValues.ROOMS, formValues.CAPACITY, syncElements);
  window.synchronizeFields(rooms, capacity, formValues.ROOMS, formValues.CAPACITY, onSyncOptions);

  form.addEventListener('invalid', onInvalideForm, true);
  form.addEventListener('submit', onSubmitForm);
})();
