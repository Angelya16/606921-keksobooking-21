'use strict';

(function () {
  const COORDINATES_PIN_MAP = {
    'inactive': 0,
    'active': 22
  };

  let mapPinMain = document.querySelector(`.map__pin--main`);

  const locationPinOnMap = (num) => {
    window.adAddress.value = `${mapPinMain.offsetLeft - mapPinMain.clientWidth / 2}, ${mapPinMain.offsetTop - (mapPinMain.clientHeight / 2) + num}`;
  };
  locationPinOnMap(COORDINATES_PIN_MAP[`inactive`]);

  const getStartedMap = () => {
    adFormDisabled(false);
    window.map.classList.remove(`map--faded`);
    locationPinOnMap(COORDINATES_PIN_MAP[`active`]);
    window.addsPinsMap();
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      getStartedMap();
    }
  });
  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      getStartedMap();
    }
  });
})();
