'use strict';

window.createDate = (function () {
  return {
    /**
     * набор свойств для клавиш
     * @enum {number} keyCode
     */
    keyCodes: {
      ESC: 27,
      ENTER: 13
    },

    pinParams: {
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
    },

    dictionaryTypes: {
      'flat': 'Квартира',
      'house': 'Дома',
      'bungalo': 'Бунгало'
    },

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

    createObjectAd: function () {

      var locationX = window.util.getRandomNumber(300, 900);
      var locationY = window.util.getRandomNumber(100, 500);
      var maxArrayLength = window.util.getRandomNumber(0, 6);

      var Ad = {
        'author': {
          'avatar': window.util.getImagePath(window.util.getRandomNumber(1, 8)),
        },
        'offer': {
          'title': window.util.getRandomElement(window.createDate.pinParams.TITLES),
          'address': locationX + ', ' + locationY,
          'price': window.util.getRandomNumber(window.createDate.pinParams.MIN_PRICE, window.createDate.pinParams.MAX_PRICE),
          'type': window.util.getRandomElement(window.createDate.pinParams.TYPES),
          'rooms': window.util.getRandomNumber(window.createDate.pinParams.MIN_ROOM, window.createDate.pinParams.MAX_ROOM),
          'guests': window.util.getRandomNumber(window.createDate.pinParams.MIN_GUESTS_IN_ROOM, window.createDate.pinParams.MAX_GUESTS_IN_ROOM),
          'checkin': window.util.getRandomElement(window.createDate.pinParams.TIME),
          'checkout': window.util.getRandomElement(window.createDate.pinParams.TIME),
          'features': window.util.getRandomArray(window.createDate.pinParams.FEATURES, maxArrayLength, true),
          'description': '',
          'photos': []
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      };

      return Ad;
    }
  };
})();
