'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.serverRequest(URL, window.unload, `POST`);
  // const StatusCode = {
  //   OK: 200
  // };

  // window.unload = (data, onSuccess) => {

  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = `json`;

  //   xhr.addEventListener(`load`, () => {
  //     if (xhr.status === StatusCode.OK) {
  //       onSuccess(xhr.response);
  //     } else {
  //       window.errorHandler(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
  //     }
  //   });

  //   xhr.open(`POST`, URL);
  //   xhr.send(data);
  // };
})();
