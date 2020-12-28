'use strict';

(function () {
  const PARAMS_PINS = {
    w: 50,
    h: 70
  };

  const MAX_NUM_PINS = 5;

  let mapPinTemplate = document.querySelector(`#pin`).content;
  window.mapPins = document.querySelector(`.map__pins`);

  const renderAdPin = (ad) => {
    let adElement = mapPinTemplate.cloneNode(true);

    let adPin = adElement.querySelector(`.map__pin`);

    adPin.style.left = ad.location.x - PARAMS_PINS.w / 2 + `px`;
    adPin.style.top = ad.location.y - PARAMS_PINS.h + `px`;

    let picture = adElement.querySelector(`img`);
    picture.src = ad.author.avatar;
    picture.alt = ad.offer.title;

    return adElement;
  };

  let controlPins = (value) => {
    let mapPin = window.mapPins.querySelectorAll(`button[class="map__pin"]`);

    for (let i = 0; i < mapPin.length; i++) {
      if (value === `add`) {
        mapPin[i].addEventListener(`click`, () => {
          window.openPopup(i);
        });
      } else {
        mapPin[i].remove();
      }
    }
  };

  window.baseOfAds = [];
  window.filterAds = [];

  window.showPins = (adds) => {
    window.removesPinsMap();

    const takeNumber = adds.length > MAX_NUM_PINS ? MAX_NUM_PINS : adds.length;

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderAdPin(adds[i]));
    }
    window.mapPins.appendChild(fragment);
    controlPins(`add`);
  };

  window.updatePins = () => {
    let baseOfFilterAds = window.baseOfAds.filter((ad) => {
      let maxPrice = window.criteriaPrice[window.filters.priceBtn.value].max;
      let minPrice = window.criteriaPrice[window.filters.priceBtn.value].min;

      let receivedAdBase = ad.offer.features;

      let selectionOfAds = (adFeatures, selectedFeatures) => {
        for (let i = 0; i < selectedFeatures.length; i++) {
          if (adFeatures.indexOf(selectedFeatures[i]) === -1) {
            adFeatures = [];
          }
        }
        receivedAdBase = adFeatures;
        return adFeatures;
      };

      selectionOfAds(receivedAdBase, window.featuresAd);

      // if ((ad.offer.type === window.filters.typeBtn.value || window.filters.typeBtn.value === `any`) &&
      //   (ad.offer.rooms === +window.filters.roomsBtn.value || window.filters.roomsBtn.value === `any`) &&
      //   (ad.offer.guests === +window.filters.guestsBtn.value || window.filters.guestsBtn.value === `any`) &&
      //   (ad.offer.price >= minPrice && ad.offer.price <= maxPrice) &&
      //   (receivedAdBase !== -1 && receivedAdBase === ad.offer.features)) {
      //   return ad;
      // }

      return (ad.offer.type === window.filters.typeBtn.value || window.filters.typeBtn.value === `any`) && (ad.offer.rooms === +window.filters.roomsBtn.value || window.filters.roomsBtn.value === `any`) && (ad.offer.guests === +window.filters.guestsBtn.value || window.filters.guestsBtn.value === `any`) && (ad.offer.price >= minPrice && ad.offer.price <= maxPrice) && (receivedAdBase !== -1 && receivedAdBase === ad.offer.features);

    });

    window.showPins(baseOfFilterAds);
    window.filterAds = baseOfFilterAds;
  };

  window.addsPinsMap = () => {
    window.successHandlerPin = (data) => {
      window.baseOfAds = data;
      if (data !== []) {
        window.resultfilterAd();
      }
    };
    window.load(window.successHandlerPin, window.errorHandler);
  };

  window.removesPinsMap = () => {
    controlPins(`remove`);
  };

})();
