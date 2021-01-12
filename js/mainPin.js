'use strict';

(function () {
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

  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  window.isActiveMap = false;

  window.adFormGlobal = document.querySelector(`.ad-form`);
  const adAddress = window.adFormGlobal.querySelector(`#address`);

  const locationPinOnMap = (num) => {
    const pinCoordsX = Math.round(mapPinMain.offsetLeft + mapPinMain.clientWidth / 2);
    const pinCoordsY = Math.round(mapPinMain.offsetTop + mapPinMain.clientHeight / 2 + num);
    adAddress.value = `${pinCoordsX}, ${pinCoordsY}`;
  };

  locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.center);

  window.startPosMainPin = () => {
    mapPinMain.style.left = START_LOCATION_PIN.coordX + `px`;
    mapPinMain.style.top = START_LOCATION_PIN.coordY + `px`;
    if (!window.isActiveMap) {
      locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.center);
    } else {
      locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.bottomCenter);
    }
  };

  const getStartedMap = (evt) => {
    if ((evt.which === 1 || evt.key === `Enter`) && !window.isActiveMap) {
      locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.bottomCenter);
      map.classList.remove(`map--faded`);
      window.formDisabled(false);
      window.sendAdData = false;
    }
    if ((evt.type === `mouseup` || evt.key === `Enter`) && !window.isActiveMap) {
      window.addsPinsMap();
      window.isActiveMap = true;
    }
  };

  window.getEndedMap = () => {
    window.formDisabled(true);
    window.isActiveMap = false;
    window.removesPinsMap();
    map.classList.add(`map--faded`);
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {

    getStartedMap(evt);

    if (evt.which === 1) {
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        const movePin = function (value, min, max) {
          if (value < min) {
            return min;
          } else if (value > max) {
            return max;
          } else {
            return value;
          }
        };

        const centerPinX = mapPinMain.clientWidth / 2;

        mapPinMain.style.top = movePin(mapPinMain.offsetTop - shift.y, PIN_LIMITS_ON_MAP.min - mapPinMain.scrollHeight, PIN_LIMITS_ON_MAP.max - mapPinMain.scrollHeight) + `px`;
        mapPinMain.style.left = movePin(mapPinMain.offsetLeft - shift.x, (window.mapPins.offsetLeft - centerPinX) - 1, (window.mapPins.offsetWidth - centerPinX) - 1) + `px`;

        locationPinOnMap(TRANSFORM_ORIGIN_COORDS_PIN_MAP.bottomCenter);
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup,`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });


  mapPinMain.addEventListener(`keydown`, (evt) => {
    getStartedMap(evt);
  });

  mapPinMain.addEventListener(`mouseup`, (evt) => {
    getStartedMap(evt);
  });

})();
