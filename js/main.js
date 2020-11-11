'use strict';

(function () {
  window.getAdData = [];
  window.sendAdData = false;

  let errorTemplate = document.querySelector(`#error`).content;

  window.errorHandler = (errorMessage) => {
    let errorWindow = errorTemplate.cloneNode(true);
    errorWindow.querySelector(`.error__message`).textContent = errorMessage;
    document.body.appendChild(errorWindow);

    let errorButton = document.querySelector(`.error__button`);

    let closeErrorWindow = (evt) => {
      if (evt.type === `click` || evt.key === `Escape`) {
        document.querySelector(`.error`).remove();
        errorButton.removeEventListener(`click`, closeErrorWindow);
        document.removeEventListener(`click`, closeErrorWindow);
        document.removeEventListener(`keydown`, closeErrorWindow);
      }
    };

    let reloadData = (evt) => {
      window.load(window.successHandlerPin, window.errorHandler);
      closeErrorWindow(evt);
    };

    errorButton.addEventListener(`click`, reloadData);
    document.addEventListener(`keydown`, closeErrorWindow);
    document.addEventListener(`click`, closeErrorWindow);
  };

  // let succesTemplate = document.querySelector(`#success`).content;

})();
