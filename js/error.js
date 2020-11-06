'use strict';

(function () {

  let errorTemplate = document.querySelector(`#error`).content;

  window.errorHandler = (errorMessage) => {
    let errorWindow = errorTemplate.cloneNode(true);
    errorWindow.querySelector(`.error__message`).textContent = errorMessage;
    document.body.appendChild(errorWindow);

    let errorButton = document.querySelector(`.error__button`);
    let closeErrorWindow = () => {
      document.querySelector(`.error`).remove();
      window.load(window.successHandler, window.errorHandler);
      errorButton.removeEventListener(`click`, closeErrorWindow);
    };
    errorButton.addEventListener(`click`, closeErrorWindow);
  };

})();
