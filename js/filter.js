'use strict';

(function () {
  const housingTypeBtn = document.querySelector(`#housing-type`);
  const housingPriceBtn = document.querySelector(`#housing-price`);
  const housingRoomsBtn = document.querySelector(`#housing-rooms`);
  const housingGuestsBtn = document.querySelector(`#housing-guests`);
  const housingFeaturesBtn = document.querySelector(`#housing-features`);

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
  }

  const filterAd = (evt) => {

    let nameInput = evt.target.parentElement.id || evt.target.id;

    for (let i = 0; i < window.baseOfAds.length; i++) {

      if (nameInput == `housing-type`) {
        if (window.baseOfAds[i].offer.type === housingTypeBtn.value || housingTypeBtn.value === `any`) {
          console.log(window.baseOfAds[i].offer.type, i);
        }
      }

      if (nameInput == `housing-price`) {
        let maxPrice = PRICE_CRITERIA[housingPriceBtn.value].max;
        let minPrice = PRICE_CRITERIA[housingPriceBtn.value].min;

        if (window.baseOfAds[i].offer.price >= minPrice && window.baseOfAds[i].offer.price <= maxPrice) {
          console.log(window.baseOfAds[i].offer.price, i);
        }
      }

      if (nameInput == `housing-rooms`) {
        if (window.baseOfAds[i].offer.rooms === +housingRoomsBtn.value || housingRoomsBtn.value === `any`) {
          console.log(window.baseOfAds[i].offer.rooms, i);
        }
      }

      if (nameInput == `housing-guests`) {
        if (window.baseOfAds[i].offer.guests === +housingGuestsBtn.value || housingGuestsBtn.value === `any`) {
          console.log(window.baseOfAds[i].offer.guests, i);
        }
      }

      if (nameInput == `housing-features`) {
        let featuresInput = housingFeaturesBtn.querySelectorAll(`input`);
        for (let j = 0; j < featuresInput.length; j++) {
          //   if (window.baseOfAds[i].offer.features[j] === housingTypeBtn.value || housingTypeBtn.value === `any`) {
          //     console.log(window.baseOfAds[i].offer.features);
          //   }

          console.log(featuresInput);
          // console.log(featuresInput[j].checked);
        }

      }

    }
    // console.log(housingTypeBtn.value, housingPriceBtn.value, housingRoomsBtn.value, housingGuestsBtn.value);
    // housingFeaturesBtn
  }

  housingTypeBtn.addEventListener(`input`, filterAd);
  housingPriceBtn.addEventListener(`input`, filterAd);
  housingRoomsBtn.addEventListener(`input`, filterAd);
  housingGuestsBtn.addEventListener(`input`, filterAd);
  housingFeaturesBtn.addEventListener(`input`, filterAd);


  // console.log(housingTypeBtn.value, housingPriceBtn.value, housingRoomsBtn.value, housingGuestsBtn.value, housingFeaturesBtn)
})();
