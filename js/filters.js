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


    if (type.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (element) {
        return element.offer.type === type.value;
      });
    }

    filteredOffers = filteredOffers.filter(function (element) {
      switch (price.value) {
        case 'any':
          return true;
        case 'low':
          return element.offer.price < 10000;
        case 'middle':
          return element.offer.price >= 10000 && element.offer.price <= 50000;
        case 'high':
          return element.offer.price > 50000;
      }
      return false;
    });

    if (rooms.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (element) {
        return element.offer.rooms === +rooms.value;
      });
    }

    if (guests.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (element) {
        return element.offer.guests === +(guests.value);
      });
    }

    filteredOffers.forEach(function (element) {
      fragment.appendChild(window.pin.createPin(element));
    });

    tokyoPinMap.appendChild(fragment);

  };

  filters.addEventListener('change', function () {
    window.debounce.debounceItem(updatePins(offers));
  });

  return updatePins;

})();
