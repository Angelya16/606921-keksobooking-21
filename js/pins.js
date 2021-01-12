'use strict';

(function () {
  const PARAMS_PINS = {
    w: 50,
    h: 70
  };

  const MAX_NUM_PINS = 5;

  const mapPinTemplate = document.querySelector(`#pin`).content;
  window.mapPins = document.querySelector(`.map__pins`);

  const renderAdPin = (ad) => {
    const adElement = mapPinTemplate.cloneNode(true);

    const adPin = adElement.querySelector(`.map__pin`);

    adPin.style.left = ad.location.x - PARAMS_PINS.w / 2 + `px`;
    adPin.style.top = ad.location.y - PARAMS_PINS.h + `px`;

    const picture = adElement.querySelector(`img`);

    picture.src = ad.author.avatar;
    picture.alt = ad.offer.title;

    return adElement;
  };

  const controlPins = (value) => {
    const mapPin = window.mapPins.querySelectorAll(`button[class="map__pin"]`);

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

  let baseOfAds = [];
  window.filterAds = [];

  const showPins = (adds) => {
    window.removesPinsMap();

    const takeNumber = adds.length > MAX_NUM_PINS ? MAX_NUM_PINS : adds.length;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderAdPin(adds[i]));
    }
    window.mapPins.appendChild(fragment);
    controlPins(`add`);
  };

  window.updatePins = () => {
    const baseOfFilterAds = baseOfAds.filter((ad) => {
      const maxPrice = window.CriteriaPrice[window.filters.priceBtn.value].max;
      const minPrice = window.CriteriaPrice[window.filters.priceBtn.value].min;

      let receivedAdBase = ad.offer.features;

      const selectionOfAds = (adFeatures, selectedFeatures) => {
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

    showPins(baseOfFilterAds);
    window.filterAds = baseOfFilterAds;
  };

  window.addsPinsMap = () => {
    window.successHandlerPin = (data) => {
      baseOfAds = data;
      if (data !== []) {
        window.resultfilterAd();
      }
    };
    window.load(null, window.successHandlerPin, window.errorHandler);
  };

  window.removesPinsMap = () => {
    controlPins(`remove`);
  };

})();
