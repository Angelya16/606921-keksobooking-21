'use strict';

(function () {
  let URL = `https://21.javascript.pages.academy/keksobooking/data`;

  let StatusCode = {
    OK: 200
  };

  let TIMEOUT_IN_MS = 10000;

  window.load = (onSuccess, onError) => {

    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        window.getAdData = xhr.response;
        onSuccess(window.getAdData);
        window.callFromLoad = true;
        window.mapFiltersContShow(false);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        window.mapFiltersContShow(true);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
      window.mapFiltersContShow(true);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      window.mapFiltersContShow(true);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };

})();
