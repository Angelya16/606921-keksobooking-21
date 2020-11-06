'use strict';

(function () {

  let errorTemplate = document.querySelector(`#error`).content;

  window.errorHandler = (errorMessage) => {
    let errorWindow = errorTemplate.cloneNode(true);
    errorWindow.querySelector(`.error__message`).textContent = errorMessage;
    document.body.appendChild(errorWindow);


  let errorButton = document.querySelector(`.error__button`);
    let closeErrorWindow = () => {
      window.load(window.successHandler, window.errorHandler);
      // console.log(1);
      // errorButton.removeEventListener(`click`, closeErrorWindow);
      // errorButton.remove();
    }
    console.log(1, errorButton);
    // errorButton.addEventListener(`click`, closeErrorWindow);

    errorButton.addEventListener(`click`, () => {

      console.log(2, errorButton);

    });
  };

})();
