'use strict';

window.data = (function () {
  /**
   * Возвращает строку с адресом картинки
   * @param {number} number
   *
   * @return {string}
   */
  var getImagePath = function (number) {
    return number > 9 ? 'img/avatars/user' + number + '.png' : 'img/avatars/user' + '0' + number + '.png';
  };

  return {

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
      'MIN_GUESTS': 1,
      'MAX_GUESTS': 10,
      'MIN_ROOM': 1,
      'MAX_ROOM': 5,
      'MIN_PRICE': 1000,
      'MAX_PRICE': 1000000,
      'CARD_COUNT': 1,
      'MIN_ARRAY_LENGTH': 0,
      'MAX_ARRAY_LENGTH': 6
    },

    adTypesDict: {
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

    createObjectAd: function (index) {

      var locationX = window.utils.getRandomNumber(300, 900);
      var locationY = window.utils.getRandomNumber(100, 500);
      var maxArrayLength = window.utils.getRandomNumber(window.data.pinParams.MIN_ARRAY_LENGTH, window.data.pinParams.MAX_ARRAY_LENGTH);

      var Ad = {
        'author': {
          'avatar': getImagePath(index + 1),
        },
        'offer': {
          'title': window.utils.getRandomElement(window.data.pinParams.TITLES),
          'address': locationX + ', ' + locationY,
          'price': window.utils.getRandomNumber(window.data.pinParams.MIN_PRICE, window.data.pinParams.MAX_PRICE),
          'type': window.utils.getRandomElement(window.data.pinParams.TYPES),
          'rooms': window.utils.getRandomNumber(window.data.pinParams.MIN_ROOM, window.data.pinParams.MAX_ROOM),
          'guests': window.utils.getRandomNumber(window.data.pinParams.MIN_GUESTS, window.data.pinParams.MAX_GUESTS),
          'checkin': window.utils.getRandomElement(window.data.pinParams.TIME),
          'checkout': window.utils.getRandomElement(window.data.pinParams.TIME),
          'features': window.utils.getRandomArray(window.data.pinParams.FEATURES, maxArrayLength, true),
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
