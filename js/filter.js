'use strict';

(function () {
  const housingTypeBtn = document.querySelector(`#housing-type`);
  const housingPriceBtn = document.querySelector(`#housing-price`);
  const housingRoomsBtn = document.querySelector(`#housing-rooms`);
  const housingGuestsBtn = document.querySelector(`#housing-guests`);
  const housingFeaturesBtn = document.querySelector(`#housing-features`);

  window.filters = {
    typeBtn: housingTypeBtn,
    priceBtn: housingPriceBtn,
    roomsBtn: housingRoomsBtn,
    guestsBtn: housingGuestsBtn
  };

  const PRICE_CRITERIA = {
    'any': {
      'min': 0,
      'max': Infinity
    },
    'low': {
      'min': 0,
      'max': 10000
    },
    'middle': {
      'min': 10000,
      'max': 50000
    },
    'high': {
      'min': 50000,
      'max': Infinity
    }
  };

  window.criteriaPrice = PRICE_CRITERIA;

  const filterAd = () => {

    const featuresInput = housingFeaturesBtn.querySelectorAll(`input`);

    window.featuresAd = [];

    for (let i = 0; i < featuresInput.length; i++) {
      if (featuresInput[i].checked) {
        window.featuresAd.push(featuresInput[i].value);
      }
    }

    window.controlPopup(0);
    window.updatePins();
  };

  window.resultfilterAd = filterAd;

  housingTypeBtn.addEventListener(`input`, filterAd);
  housingPriceBtn.addEventListener(`input`, filterAd);
  housingRoomsBtn.addEventListener(`input`, filterAd);
  housingGuestsBtn.addEventListener(`input`, filterAd);
  housingFeaturesBtn.addEventListener(`input`, filterAd);
})();
