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

  window.addsPinsMap = () => {
    window.successHandler = (ads) => {
      let fragment = document.createDocumentFragment();
      for (let i = 0; i < ads.length; i++) {
        fragment.appendChild(renderAdPin(window.getAdData[i]));
      }
      window.mapPins.appendChild(fragment);

      let mapPin = window.mapPins.querySelectorAll(`button[class="map__pin"]`);
      for (let i = 0; i < mapPin.length; i++) {
        mapPin[i].addEventListener(`click`, (evt) => {
          if (evt.which === 1) {
            window.openPopup(i);
            console.log(mapPin);
          }
        });
      }
    };
    window.load(window.successHandler, window.errorHandler);
  };
})();
