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

  window.restartFiltersValues = false;

  const filterAd = () => {
    const featuresInput = housingFeaturesBtn.querySelectorAll(`input`);

    if (!window.restartFiltersValues) {
      housingTypeBtn.value = housingRoomsBtn.value = housingGuestsBtn.value = housingPriceBtn.value = `any`;
      for (let i = 0; i < featuresInput.length; i++) {
        featuresInput[i].checked = false;
      }
      window.restartFiltersValues = true;
    }

    window.featuresAd = [];

    for (let i = 0; i < featuresInput.length; i++) {
      if (featuresInput[i].checked) {
        window.featuresAd.push(featuresInput[i].value);
      }
    }

    window.controlPopup(0);
    // window.debounce(window.updatePins());
    window.updatePins();
  };

  window.resultfilterAd = filterAd;

  const debounceFilterAds = window.debounce(filterAd);

  housingTypeBtn.addEventListener(`input`, debounceFilterAds);
  housingPriceBtn.addEventListener(`input`, debounceFilterAds);
  housingRoomsBtn.addEventListener(`input`, debounceFilterAds);
  housingGuestsBtn.addEventListener(`input`, debounceFilterAds);
  housingFeaturesBtn.addEventListener(`input`, debounceFilterAds);
})();
