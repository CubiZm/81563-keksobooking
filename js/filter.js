'use strict';

(function () {
  var filterForm = document.querySelector('.tokyo__filters');
  var type = filterForm.querySelector('#housing_type');
  var price = filterForm.querySelector('#housing_price');
  var rooms = filterForm.querySelector('#housing_room-number');
  var guests = filterForm.querySelector('#housing_guests-number');
  var features = filterForm.querySelectorAll('input[type="checkbox"]');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  var dictTypePrice = {
    'small': 10000,
    'large': 50000
  };

  var offers = [];

  var renderPins = function (data) {
    offers = data;
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
  };

  var updatePins = function (data) {
    offers = data;
    var fragment = document.createDocumentFragment();

    var filteredOffers = offers;

    filteredOffers = filteredOffers.filter(function (element) {

      var dictTypePriceFilter = {
        'any': true,
        'low': element.offer.price < dictTypePrice['small'],
        'middle': element.offer.price >= dictTypePrice['small'] && element.offer.price <= dictTypePrice['large'],
        'high': element.offer.price > dictTypePrice['large'],
        'default': false
      };

      return dictTypePriceFilter[price.value] || dictTypePriceFilter['default'];
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

    renderPins(data);

    tokyoPinMap.appendChild(fragment);

  };

  var updatePinsWrap = function () {
    updatePins(offers);
  };

  filterForm.addEventListener('change', function () {
    window.utils.debounce(updatePinsWrap);
  });

  window.filter = updatePins;

})();
