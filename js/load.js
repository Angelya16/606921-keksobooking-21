'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  window.serverRequest(URL, window.load, `GET`);
  // const StatusCode = {
  //   OK: 200
  // };

  // const TIMEOUT_IN_MS = 10000;

  // window.load = (onSuccess, onError) => {

  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = `json`;

  //   xhr.addEventListener(`load`, () => {
  //     if (xhr.status === StatusCode.OK) {
  //       onSuccess(xhr.response);
  //       window.mapFiltersContShow(false);
  //     } else {
  //       onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
  //       window.mapFiltersContShow(true);
  //     }
  //   });

  //   xhr.addEventListener(`error`, () => {
  //     onError(`Произошла ошибка соединения`);
  //     window.mapFiltersContShow(true);
  //   });

  //   xhr.addEventListener(`timeout`, () => {
  //     onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  //     window.mapFiltersContShow(true);
  //   });

  //   xhr.timeout = TIMEOUT_IN_MS;

  //   xhr.open(`GET`, URL);
  //   xhr.send();
  // };

})();
