'use strict';

window.createCard = (function () {

  var OFFERS = 8;

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  var pinsArray = window.util.getElementsArray(OFFERS);

  tokyoPinMap.appendChild(window.createPin.getPinNodes(pinsArray));

  window.createMap.hideDialog();

  var dialogTitle = document.querySelector('.dialog__title');

  return {
    /**
     * Создаёт HTML-разметку объявления
     * @param {Ad} ad
     *
     * @return {HTMLElement}
     */
    createAdNode: function (ad) {
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

      var randomFeaturesArray = window.util.getRandomArray(window.createDate.pinParams.FEATURES, window.util.getRandomNumber(0, 5), true);

      adTitle.textContent = ad.offer.title;
      adAddress.textContent = ad.offer.address;
      adPrice.textContent = ad.offer.price + ' ₽/ночь';
      adType.textContent = window.createDate.dictionaryTypes[window.util.getRandomElement(window.createDate.pinParams.TYPES)];
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
    }
  };
})();
