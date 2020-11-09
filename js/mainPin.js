'use strict';

(function () {
  let mapPinMain = document.querySelector(`.map__pin--main`);

  const TRANSFORM_ORIGIN_COORDS_PIN_MAP = {
    center: 0,
    bottomCenter: 47.5
  };

  const PIN_LIMITS_ON_MAP = {
    min: 130,
    max: 630
  };

  const START_LOCATION_PIN = {
    coordX: 570,
    coordY: 375
  };

  window.isActiveMap = false;

  window.adFormGlobal = document.querySelector(`.ad-form`);
  let adAddress = window.adFormGlobal.querySelector(`#address`);

  let locationPinOnMap = (num) => {
    let pinCoordsX = Math.round(mapPinMain.offsetLeft + mapPinMain.clientWidth / 2);
    let pinCoordsY = Math.round(mapPinMain.offsetTop + mapPinMain.clientHeight / 2 + num);
    adAddress.value = `${pinCoordsX}, ${pinCoordsY}`;
  };

  locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.center);

  window.getStartedMap = () => {
    window.mapAndFormDisabled(false);
    locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.bottomCenter);
    window.isActiveMap = true;
    window.addsPinsMap();
    window.map.classList.remove(`map--faded`);
  };

  window.getEndedMap = () => {
    mapPinMain.style.left = START_LOCATION_PIN.coordX + `px`;
    mapPinMain.style.top = START_LOCATION_PIN.coordY + `px`;
    locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.center);
    window.mapAndFormDisabled(true);
    window.isActiveMap = false;
    window.removesPinsMap();
    window.map.classList.add(`map--faded`);
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1 && !window.isActiveMap) {
      window.getStartedMap();
    }
    if (evt.which === 1) {
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let movePin = function (value, min, max) {
          if (value < min) {
            return min;
          } else if (value > max) {
            return max;
          } else {
            return value;
          }
        };

        let centerPinX = mapPinMain.clientWidth / 2;

        mapPinMain.style.top = movePin(mapPinMain.offsetTop - shift.y, PIN_LIMITS_ON_MAP.min - mapPinMain.scrollHeight, PIN_LIMITS_ON_MAP.max - mapPinMain.scrollHeight) + `px`;
        mapPinMain.style.left = movePin(mapPinMain.offsetLeft - shift.x, (window.mapPins.offsetLeft - centerPinX) - 1, (window.mapPins.offsetWidth - centerPinX) - 1) + `px`;

        locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.bottomCenter);
      };

      let onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup,`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });


  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.getStartedMap();
    }
  });
})();
