'use strict';

(function () {
  let URL = `https://21.javascript.pages.academy/keksobooking`;

  let StatusCode = {
    OK: 200
  };

  window.upload = (data, onSuccess) => {

    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        window.errorHandler(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
