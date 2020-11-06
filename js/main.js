'use strict';

(function () {
  window.getAdData = [];
  let errorTemplate = document.querySelector(`#error`).content;

  window.errorHandler = (errorMessage) => {
    let errorWindow = errorTemplate.cloneNode(true);
    errorWindow.querySelector(`.error__message`).textContent = errorMessage;
    document.body.appendChild(errorWindow);

    let errorButton = document.querySelector(`.error__button`);
    let closeErrorWindow = (evt) => {
      if (evt.type === `click` || evt.key === `Escape`) {
        document.querySelector(`.error`).remove();
        window.load(window.successHandler, window.errorHandler);
        errorButton.removeEventListener(`click`, closeErrorWindow);
        document.removeEventListener(`click`, closeErrorWindow);
        document.removeEventListener(`keydown`, closeErrorWindow);
      }
    };
    errorButton.addEventListener(`click`, closeErrorWindow);
    document.addEventListener(`click`, closeErrorWindow);
    document.addEventListener(`keydown`, closeErrorWindow);
  };

})();
