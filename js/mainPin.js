'use strict';

(function () {
  let mapPinMain = document.querySelector(`.map__pin--main`);

  const TRANSFORM_ORIGIN_COORDS_PIN_MAP = {
    center: 2,
    bottomCenter: 1
  };

  const PIN_LIMITS_ON_MAP = {
    min: 130,
    max: 630
  };

  let isActiveMap = false;

  window.adFormGlobal = document.querySelector(`.ad-form`);
  let adAddress = window.adFormGlobal.querySelector(`#address`);

  let coordsPinMap = {
    pinCoordsX: 0,
    pinCoordsY: 0
  };

  const locationPinOnMap = (num) => {
    coordsPinMap.pinCoordsX = Math.round(mapPinMain.offsetLeft + mapPinMain.clientWidth / 2);
    coordsPinMap.pinCoordsY = Math.round(mapPinMain.offsetTop + mapPinMain.scrollHeight / num);
    adAddress.value = `${coordsPinMap.pinCoordsX}, ${coordsPinMap.pinCoordsY}`;
  };

  locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.center);

  const getStartedMap = () => {
    window.adFormDisabled(false);
    window.map.classList.remove(`map--faded`);
    locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.bottomCenter);
    window.addsPinsMap();
    isActiveMap = true;
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1 && !isActiveMap) {
      getStartedMap();
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
        mapPinMain.style.left = movePin(mapPinMain.offsetLeft - shift.x, window.mapPins.offsetLeft - centerPinX, window.mapPins.offsetWidth - centerPinX) + `px`;

        locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP[`bottomCenter`]);
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
      getStartedMap();
    }
  });
})();
