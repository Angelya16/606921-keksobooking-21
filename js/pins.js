'use strict';

(function () {
  const PARAMS_PINS = {
    w: 50,
    h: 70
  };

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

// let baseOfAds = [];
window.baseOfAds = [];

  window.addsPinsMap = () => {
    window.successHandlerPin = (data) => {
      // baseOfAds = ads;
      window.baseOfAds = data;
      let fragment = document.createDocumentFragment();
      for (let i = 0; i < window.baseOfAds.length; i++) {
        fragment.appendChild(renderAdPin(window.getAdData[i]));
      }
      window.mapPins.appendChild(fragment);
      controlPins(`add`);
    };
    window.load(window.successHandlerPin, window.errorHandler);
  };

  window.removesPinsMap = () => {
    controlPins(`remove`);
  };

})();
