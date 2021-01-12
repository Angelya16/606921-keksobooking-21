'use strict';

(function () {
  const mapFilters = document.querySelector(`.map__filters`).children;

  window.mapFiltersContShow = (boolean) => {
    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = boolean;
    }
    if (!boolean) {
      document.querySelector(`.map__filters`).classList.remove(`ad-form--disabled`);
    } else {
      document.querySelector(`.map__filters`).classList.add(`ad-form--disabled`);
    }
  };

  window.mapFiltersContShow(true);

  const errorTemplate = document.querySelector(`#error`).content;

  window.errorHandler = (errorMessage) => {
    const errorWindow = errorTemplate.cloneNode(true);
    errorWindow.querySelector(`.error__message`).textContent = errorMessage;
    document.body.appendChild(errorWindow);

    const errorButton = document.querySelector(`.error__button`);

    const closeErrorWindow = (evt) => {
      if (evt.type === `click` || evt.key === `Escape`) {
        document.querySelector(`.error`).remove();
        errorButton.removeEventListener(`click`, closeErrorWindow);
        document.removeEventListener(`click`, closeErrorWindow);
        document.removeEventListener(`keydown`, closeErrorWindow);
      }
    };

    const reloadData = (evt) => {
      if (!window.callFromUpload) {
        window.load(null, window.successHandlerPin, window.errorHandler);
      } else {
        window.unload(new FormData(window.adFormGlobal), () => {
          window.startValuesForm(evt);
          window.succesHandler();
        });
      }
      closeErrorWindow(evt);
    };

    errorButton.addEventListener(`click`, reloadData);
    document.addEventListener(`keydown`, closeErrorWindow);
    document.addEventListener(`click`, closeErrorWindow);
  };

  const succesTemplate = document.querySelector(`#success`).content;

  window.succesHandler = () => {
    const succesWindow = succesTemplate.cloneNode(true);
    document.body.appendChild(succesWindow);

    const closeSuccesWindow = (evt) => {
      if (evt.type === `click` || evt.key === `Escape`) {
        document.querySelector(`.success`).remove();
        document.removeEventListener(`click`, closeSuccesWindow);
        document.removeEventListener(`keydown`, closeSuccesWindow);
      }
    };

    document.addEventListener(`keydown`, closeSuccesWindow);
    document.addEventListener(`click`, closeSuccesWindow);
  };
})();
