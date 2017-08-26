'use strict';

var OFFERS = 8;

var dialog = document.querySelector('.dialog');
var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var dialogTitle = document.querySelector('.dialog__title');

/**
 * набор свойств для клавиш
 * @enum {number} keyCode
 */
var keyCodes = {
  ESC: 27,
  ENTER: 13
};

var pinParams = {
  'TITLES': [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  'TYPES': [
    'flat',
    'house',
    'bungalo'
  ],
  'TIME': [
    '12:00',
    '13:00',
    '14:00'
  ],
  'FEATURES': [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  'MIN_GUESTS_IN_ROOM': 1,
  'MAX_GUESTS_IN_ROOM': 10,
  'MIN_ROOM': 1,
  'MAX_ROOM': 5,
  'MIN_PRICE': 1000,
  'MAX_PRICE': 1000000,
  'CARD_COUNT': 1
};

var dictionaryTypes = {
  'flat': 'Квартира',
  'house': 'Дома',
  'bungalo': 'Бунгало'
};

/**
 * Генерирует рандомное число в заданном диапозоне
 * @param {number} min
 * @param {number} max
 *
 * @return {number}
 */
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

/**
 * Получает рандомный элемент из массива
 * @param {Array} array
 *
 * @return {*}
 */
var getRandomElement = function (array) {
  var index = Math.floor(getRandomNumber(0, array.length - 1));
  return array[index];
};

/**
 * Возвращает строку с адресом картинки
 * @param {number} number
 *
 * @return {string}
 */
var getImagePath = function (number) {
  return number > 9 ? 'img/avatars/user' + number + '.png' : 'img/avatars/user' + '0' + number + '.png';
};

/**
 * Возвращает массив со случайными значениями заданной длины
 * @param {Array} array
 * @param {number} length
 * @param {boolean} unique - если true, то элементы уникальные
 *
 * @return {Array}
 */
var getRandomArray = function (array, length, unique) {
  var arr = [];

  while (arr.length < length) {
    var randomElement = getRandomElement(array);

    if (unique && ~arr.indexOf(randomElement)) {
      continue;
    } else {
      arr.push(randomElement);
    }
  }

  return arr;
};

/**
 * @typedef {Object} AdLocation
 * @property {number} x - координата по оси Х от 300 до 900
 * @property {number} y - координата по оси Y от 100 до 500
 */

/**
 * @typedef {Object} AdOffer
 * @property {string} title
 * @property {string} address - координаты адреса
 * @property {number} price - случайное число от 1000 до 1000000
 * @property {string} type - случайный тип жилища
 * @property {number} rooms - случайное число комнат от 1 до 5
 * @property {number} guests - случайное число гостей от 1 до 10
 * @property {string} checkin - случайное время поселения
 * @property {string} checkout - случайное время выселения
 * @property {Array} features - массив различной длины от 0 до 6
 * @property {string} description
 * @property {Array} photos
 */

/**
 * @typedef {Object} AdAuthor
 * @property {string} avatar
 */

/**
 * @typedef {Object} Ad
 * @property {AdAuthor} author
 * @property {AdOffer} offer
 * @property {AdLocation} location
 */

var createObjectAd = function () {

  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);
  var maxArrayLength = getRandomNumber(0, 6);

  var Ad = {
    'author': {
      'avatar': getImagePath(getRandomNumber(1, 8)),
    },
    'offer': {
      'title': getRandomElement(pinParams.TITLES),
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(pinParams.MIN_PRICE, pinParams.MAX_PRICE),
      'type': getRandomElement(pinParams.TYPES),
      'rooms': getRandomNumber(pinParams.MIN_ROOM, pinParams.MAX_ROOM),
      'guests': getRandomNumber(pinParams.MIN_GUESTS_IN_ROOM, pinParams.MAX_GUESTS_IN_ROOM),
      'checkin': getRandomElement(pinParams.TIME),
      'checkout': getRandomElement(pinParams.TIME),
      'features': getRandomArray(pinParams.FEATURES, maxArrayLength, true),
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return Ad;
};

/**
 * Создаёт HTML-разметку пина
 * @param {Ad} pin
 *
 * @return {HTMLElement}
 */
var createPinElement = function (pin) {

  var img = {
    WIDTH: 40,
    HEIGHT: 40,
    CLASS_NAME: 'rounded'
  };

  var PIN_CLASS_NAME = 'pin';
  var PIN_TAB_INDEX = '0';

  var pinBaloon = document.createElement('div');
  var imgElement = document.createElement('img');

  pinBaloon.className = PIN_CLASS_NAME;
  pinBaloon.style.left = pin.location.x - pinBaloon.offsetWidth + 'px';
  pinBaloon.style.top = pin.location.y - pinBaloon.offsetHeight + 'px';
  pinBaloon.tabIndex = PIN_TAB_INDEX;

  imgElement.className = img.CLASS_NAME;
  imgElement.src = pin.author.avatar;
  imgElement.width = img.WIDTH;
  imgElement.height = img.HEIGHT;

  pinBaloon.appendChild(imgElement);

  return pinBaloon;
};

/**
 * Создаёт HTML-разметку объявления
 * @param {Ad} ad
 *
 * @return {HTMLElement}
 */
var createAdNode = function (ad) {
  var template = document.querySelector('#lodge-template').content;

  var adElement = template.cloneNode(true);

  var adTitle = adElement.querySelector('.lodge__title');
  var adAddress = adElement.querySelector('.lodge__address');
  var adPrice = adElement.querySelector('.lodge__price');
  var adType = adElement.querySelector('.lodge__type');
  var adRoomsAndGuest = adElement.querySelector('.lodge__rooms-and-guests');
  var adCheck = adElement.querySelector('.lodge__checkin-time');
  var adFeatures = adElement.querySelector('.lodge__features');
  var adDescription = adElement.querySelector('.lodge__description');

  var dialogImg = dialogTitle.querySelector('img');

  var randomFeaturesArray = getRandomArray(pinParams.FEATURES, getRandomNumber(0, 5), true);

  adTitle.textContent = ad.offer.title;
  adAddress.textContent = ad.offer.address;
  adPrice.textContent = ad.offer.price + ' ₽/ночь';
  adType.textContent = dictionaryTypes[getRandomElement(pinParams.TYPES)];
  adRoomsAndGuest.textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
  adCheck.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adDescription.textContent = ad.offer.description;
  dialogImg.src = ad.author.avatar;

  randomFeaturesArray.forEach(function (element) {
    var span = document.createElement('span');

    span.className = 'feature__image feature__image--' + element;
    adFeatures.appendChild(span);
  });

  return adElement;
};

/**
 * Создаёт массив с заданным количеством объектов (пинов) в нём
 * @param {number} arrayLength
 *
 * @return {Array}
 */
var getElementsArray = function (arrayLength) {
  var pins = [];

  for (var j = 0; j < arrayLength; j++) {
    pins.push(createObjectAd());
  }

  return pins;
};


var initPinHandlers = function (node, ad) {
  node.addEventListener('click', function (evt) {
    openPinDialog(evt, ad);
  });

  node.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keyCodes.ENTER) {
      openPinDialog(evt, ad);
    }
  });
};

/**
 * Создаёт пины
 * @param {Ad} ad
 *
 * @return {HTMLElement}
 */
var createPin = function (ad) {
  var node = createPinElement(ad);
  initPinHandlers(node, ad);

  return node;
};

/**
 * Создаёт HTML-фрагмент пинов по шаблону
 * @param {Array.<Ad>} pinsArray
 *
 * @return {HTMLElement}
 */
var getPinNodes = function (pinsArray) {

  var fragment = document.createDocumentFragment();

  pinsArray.forEach(function (element) {
    fragment.appendChild(createPin(element));
  });

  return fragment;
};

var activatePin = function (pin) {
  pin.classList.add('pin--active');
};

var deactivePin = function () {
  var activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
};

var showDialog = function () {
  dialog.style.display = 'block';
};

var hideDialog = function () {
  dialog.style.display = 'none';
};

var openPinDialog = function (evt, ad) {
  var target = evt.currentTarget;
  var dialogPanel = dialog.querySelector('.dialog__panel');

  dialog.replaceChild(createAdNode(ad), dialogPanel);

  deactivePin();
  activatePin(target);
  showDialog();
};

var onCloseWindowClick = function () {
  hideDialog();
  deactivePin();
};

var onDeactiveElements = function (evt) {
  if (evt.keyCode === keyCodes.ESC) {
    hideDialog();
    deactivePin();
  }
};

var onCloseWindowKeydown = function (evt) {
  if (evt.keyCode === keyCodes.ENTER || evt.keyCode === keyCodes.ESC) {
    hideDialog();
    deactivePin();
  }
};

var initEventHandler = function () {
  var dialogClose = document.querySelector('.dialog__close');

  dialogClose.addEventListener('click', onCloseWindowClick);
  dialogClose.addEventListener('keydown', onCloseWindowKeydown);
  document.body.addEventListener('keydown', onDeactiveElements);
};

var pinsArray = getElementsArray(OFFERS);

tokyoPinMap.appendChild(getPinNodes(pinsArray));

hideDialog();
initEventHandler();
