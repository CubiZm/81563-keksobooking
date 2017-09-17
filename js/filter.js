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

  var clearMap = function () {
    var pins = document.querySelectorAll('.pin:not(.pin__main)');

    if (typeof pins !== 'undefined') {
      pins.forEach(function (element) {
        tokyoPinMap.removeChild(element);
        window.card.hideDialog();
      });
    }
  };

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (element) {
      fragment.appendChild(window.pin.createPin(element));
    });

    tokyoPinMap.appendChild(fragment);
  };

  var initPins = function (data) {
    var randomPinsArray = window.utils.getRandomArray(data, 3, true);

    offers = data;

    renderPins(randomPinsArray);

    filterForm.addEventListener('change', updatePins);
  };

  var filterByPrice = function (array) {
    return array.filter(function (element) {

      var dictTypePriceFilter = {
        'any': true,
        'low': element.offer.price < dictTypePrice['small'],
        'middle': element.offer.price >= dictTypePrice['small'] && element.offer.price <= dictTypePrice['large'],
        'high': element.offer.price > dictTypePrice['large'],
        'default': false
      };

      return dictTypePriceFilter[price.value] || dictTypePriceFilter['default'];
    });
  };

  var filterByFeatures = function (array) {
    var filteredOffers = array;

    features.forEach(function (elem) {
      if (elem.checked) {
        filteredOffers = array.filter(function (element) {
          return element.offer.features.includes(elem.value);
        });
      }
    });

    return filteredOffers;
  };

  var filterBySelect = function (array, input, value) {
    var filteredOffers = array;

    if (input.value !== 'any') {
      filteredOffers = array.filter(function (element) {
        return element.offer[value].toString() === input.value.toString();
      });
    }

    return filteredOffers;
  };

  var updatePins = function () {

    var filteredOffers = offers;

    filteredOffers = filterByPrice(filteredOffers);

    filteredOffers = filterByFeatures(filteredOffers);

    filteredOffers = filterBySelect(filteredOffers, type, 'type');
    filteredOffers = filterBySelect(filteredOffers, rooms, 'rooms');
    filteredOffers = filterBySelect(filteredOffers, guests, 'guests');

    clearMap();

    renderPins(filteredOffers);

  };

  filterForm.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

  window.filter = initPins;

})();
