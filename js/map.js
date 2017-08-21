'use strict';

var OFFERS = 8;
var MIN_GUESTS_IN_ROOM = 1;
var MAX_GUESTS_IN_ROOM = 10;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var CART_COUNT = 1;

var dialog = document.querySelector('.dialog');
var dialogPanel = dialog.querySelector('.dialog__panel');
var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var dialogTitle = document.querySelector('.dialog__title');

dialogPanel.style.display = 'none';

// Генерация рандомного числа

var getRandomNumber = function (min, max) { // генерирует рандомное число в различном диапозне
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Получение рандомного элемента из массива

var getRandomElement = function (array) {
  var index = Math.floor(getRandomNumber(0, array.length - 1));
  return array[index];
};

var pinParams = {
  'titles': [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  'types': [
    'flat',
    'house',
    'bungalo'
  ],
  'checkin': [
    '12:00',
    '13:00',
    '14:00'
  ],
  'checkout': [
    '12:00',
    '13:00',
    '14:00'
  ],
  'features': [
    'wifi',
    'dishwasher',
    'elevator',
    'conditioner'
  ],
  'description': '',
  'photos': []
};

// Преобразование типа жилья в кирилическое название

var getTypeString = function (type) {
  var typeStr = '';

  switch (type) {
    case 'flat':
      typeStr = 'Квартира';
      break;
    case 'bungalo':
      typeStr = 'Бунгало';
      break;
    case 'house':
      typeStr = 'Дом';
      break;
  }

  return typeStr;
};

var getObjPins = function () {

  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);

  var pin = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + getRandomNumber(1, 8) + '.png',
    },
    'offer': {
      'title': getRandomElement(pinParams.titles),
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
      'type': getTypeString(getRandomElement(pinParams.types)),
      'rooms': getRandomNumber(MIN_ROOM, MAX_ROOM),
      'guests': getRandomNumber(MIN_GUESTS_IN_ROOM, MAX_GUESTS_IN_ROOM),
      'checkin': getRandomElement(pinParams.checkin),
      'checkout': getRandomElement(pinParams.checkin),
      'features': getRandomElement(pinParams.features),
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return pin;
};

var createPin = function (pin) {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var PIN_CLASS_NAME = 'pin';
  var IMG_CLASS_NAME = 'rounded';

  var pinBaloon = document.createElement('div');
  var img = document.createElement('img');

  pinBaloon.className = PIN_CLASS_NAME;
  pinBaloon.style.left = pin.location.x - pinBaloon.offsetWidth + 'px';
  pinBaloon.style.top = pin.location.y - pinBaloon.offsetHeight + 'px';

  img.className = IMG_CLASS_NAME;
  img.src = pin.author.avatar;
  img.width = IMG_WIDTH;
  img.height = IMG_HEIGHT;

  pinBaloon.appendChild(img);

  return pinBaloon;
};

var createMapNode = function (map) {
  var template = document.querySelector('#lodge-template').content;

  var mapElement = template.cloneNode(true);

  var mapTitle = mapElement.querySelector('.lodge__title');
  var mapAddress = mapElement.querySelector('.lodge__address');
  var mapPrice = mapElement.querySelector('.lodge__price');
  var mapType = mapElement.querySelector('.lodge__type');
  var mapRoomsAndGuest = mapElement.querySelector('.lodge__rooms-and-guests');
  var mapCheck = mapElement.querySelector('.lodge__checkin-time');
  var mapFeatures = mapElement.querySelector('.lodge__features');
  var mapDescription = mapElement.querySelector('.lodge__description');

  var dialogImg = dialogTitle.querySelector('img');

  mapTitle.textContent = map.offer.title;
  mapAddress.textContent = map.offer.address;
  mapPrice.textContent = map.offer.price + ' ₽/ночь';
  mapType.textContent = map.offer.type;
  mapRoomsAndGuest.textContent = 'Для ' + map.offer.guests + ' гостей в ' + map.offer.rooms + ' комнатах';
  mapCheck.textContent = 'Заезд после ' + map.offer.checkin + ', выезд до ' + map.offer.checkout;
  mapDescription.textContent = map.offer.description;
  dialogImg.src = map.author.avatar;

  pinParams.features.forEach(function (element) {
    var span = document.createElement('span');

    span.className = 'feature__image feature__image--' + element;
    mapFeatures.appendChild(span);
  });

  return mapElement;
};

var getElementsArray = function (numberData) {
  var pins = [];

  for (var j = 0; j < numberData; j++) {
    pins.push(getObjPins());
  }

  return pins;
};

var getPinNodes = function (array) {

  var fragment = document.createDocumentFragment();

  array.forEach(function (element) {
    fragment.appendChild(createPin(element));
  });

  return fragment;
};

var getCardNode = function (array) {

  var fragment = document.createDocumentFragment();

  array.forEach(function (element) {
    fragment.appendChild(createMapNode(element));
  });

  dialog.replaceChild(fragment, dialogPanel);

  return fragment;
};

var pinsArray = getElementsArray(OFFERS);
var cartsArray = getElementsArray(CART_COUNT);

tokyoPinMap.appendChild(getPinNodes(pinsArray));

dialogPanel.appendChild(getCardNode(cartsArray));
