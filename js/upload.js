'use strict';

(function () {
  let URL = `https://21.javascript.pages.academy/keksobooking`;

  let StatusCode = {
    OK: 200
  };

  // let TIMEOUT_IN_MS = 10000;

  window.upload = (data, onSuccess) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
