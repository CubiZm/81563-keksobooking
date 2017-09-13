'use strict';

window.card = (function () {

  var dialog = document.querySelector('.dialog');
  var dialogTitle = document.querySelector('.dialog__title');
  var dialogImg = dialogTitle.querySelector('img');

  var template = document.querySelector('#lodge-template').content;

  var adTypesDict = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  /**
   * @typedef {Object} AdLocation
   * @property {number} x - координата по оси Х
   * @property {number} y - координата по оси Y
   */

  /**
   * @typedef {Object} AdOffer
   * @property {string} title
   * @property {string} address - координаты адреса
   * @property {number} price - число от 1000 до 1000000
   * @property {string} type - тип жилища
   * @property {number} rooms - число комнат от 1 до 5
   * @property {number} guests - число гостей от 1 до 10
   * @property {string} checkin - время поселения
   * @property {string} checkout - время выселения
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

  var createAdNode = function (ad) {

    var adElement = template.cloneNode(true);

    var adTitle = adElement.querySelector('.lodge__title');
    var adAddress = adElement.querySelector('.lodge__address');
    var adPrice = adElement.querySelector('.lodge__price');
    var adType = adElement.querySelector('.lodge__type');
    var adRoomsAndGuest = adElement.querySelector('.lodge__rooms-and-guests');
    var adCheck = adElement.querySelector('.lodge__checkin-time');
    var adFeatures = adElement.querySelector('.lodge__features');
    var adDescription = adElement.querySelector('.lodge__description');
    var adPhotos = adElement.querySelector('.lodge__photos');

    adTitle.textContent = ad.offer.title;
    adAddress.textContent = ad.offer.address;
    adPrice.textContent = ad.offer.price + ' ₽/ночь';
    adType.textContent = adTypesDict[ad.offer.type];
    adRoomsAndGuest.textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
    adCheck.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adDescription.textContent = ad.offer.description;
    dialogImg.src = ad.author.avatar;

    (ad.offer.photos).forEach(function (element) {
      var img = document.createElement('img');

      img.src = element;
      img.width = '60';
      img.height = '40';

      adPhotos.appendChild(img);
    });

    (ad.offer.features).forEach(function (element) {
      var span = document.createElement('span');

      span.className = 'feature__image feature__image--' + element;
      adFeatures.appendChild(span);
    });

    return adElement;
  };

  var onDeactiveElements = function (evt) {
    if (window.utils.isEscPressed(evt.keyCode)) {
      window.card.hideDialog();
      window.pin.deactivePin();
    }
  };

  var onCloseWindowClick = function () {
    window.card.hideDialog();
    window.pin.deactivePin();
  };

  var onCloseWindowKeydown = function (evt) {
    if (window.utils.isEnterPressed(evt.keyCode) ||
        window.utils.isEscPressed(evt.keyCode)) {
      window.card.hideDialog();
      window.pin.deactivePin();
    }
  };

  var removeEventHandler = function () {
    var dialogClose = document.querySelector('.dialog__close');

    dialogClose.removeEventListener('click', onCloseWindowClick);
    dialogClose.removeEventListener('keydown', onCloseWindowKeydown);
    document.body.removeEventListener('keydown', onDeactiveElements);
  };

  var initEventHandler = function () {
    var dialogClose = document.querySelector('.dialog__close');

    dialogClose.addEventListener('click', onCloseWindowClick);
    dialogClose.addEventListener('keydown', onCloseWindowKeydown);
    document.body.addEventListener('keydown', onDeactiveElements);
  };

  var changeDialogPanel = function (ad) {
    var dialogPanel = dialog.querySelector('.dialog__panel');
    dialog.replaceChild(createAdNode(ad), dialogPanel);
  };

  return {
    showDialog: function (ad) {
      changeDialogPanel(ad);
      initEventHandler();
      dialog.style.display = 'block';
    },

    hideDialog: function () {
      dialog.style.display = 'none';

      removeEventHandler();
    }
  };
})();
