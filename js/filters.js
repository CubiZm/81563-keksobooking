'use strict';

window.filters = (function () {
  var filters = document.querySelector('.tokyo__filters');
  var type = filters.querySelector('#housing_type');
  var price = filters.querySelector('#housing_price');
  var rooms = filters.querySelector('#housing_room-number');
  var guests = filters.querySelector('#housing_guests-number');
  var features = filters.querySelectorAll('input[type="checkbox"]');

  var offers = [];

  var updatePins = function (data) {
    offers = data;
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    var filteredOffers = offers;

    var pins = document.querySelectorAll('.pin:not(.pin__main)');

    if (typeof pins !== 'undefined') {
      pins.forEach(function (element) {
        tokyoPinMap.removeChild(element);
        window.card.hideDialog();
      });
    }

    features.forEach(function (elem) {
      if (elem.checked) {
        filteredOffers = filteredOffers.filter(function (element) {
          return element.offer.features.includes(elem.value);
        });
      }
    });

    filteredOffers = filteredOffers.filter(function (element) {

      var dictTypePrice = {
        'any': true,
        'low': element.offer.price < 10000,
        'middle': element.offer.price >= 10000 && element.offer.price <= 50000,
        'high': element.offer.price > 50000,
        'default': false
      };

      return dictTypePrice[price.value] || dictTypePrice['default'];
    });

    var filteredElements = function (input, value) {
      if (input.value !== 'any') {
        filteredOffers = filteredOffers.filter(function (element) {
          return element.offer[value].toString() === input.value.toString();
        });
      }
    };

    filteredElements(type, 'type');
    filteredElements(rooms, 'rooms');
    filteredElements(guests, 'guests');

    filteredOffers.forEach(function (element) {
      fragment.appendChild(window.pin.createPin(element));
    });

    tokyoPinMap.appendChild(fragment);

  };

  filters.addEventListener('change', function () {
    window.utils.debounceItem(updatePins(offers));
  });

  return updatePins;

})();
