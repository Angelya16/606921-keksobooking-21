'use strict';


(function () {

  const dataRequest = (url, requestDirection, method) => {
    const StatusCode = {
      OK: 200
    };

    const TIMEOUT_IN_MS = 10000;

    window[requestDirection] = (data, onSuccess, onError) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
          if (requestDirection === `load`) {
            window.mapFiltersContShow(false);
          }
        } else {
          const responseStatus = `Статус ответа: ` + xhr.status + ` ` + xhr.statusText;
          if (requestDirection === `load`) {
            onError(responseStatus);
            window.mapFiltersContShow(true);
          } else {
            window.errorHandler(responseStatus);
          }
        }
      });

      if (requestDirection === `load`) {
        xhr.addEventListener(`error`, () => {
          onError(`Произошла ошибка соединения`);
          window.mapFiltersContShow(true);
        });

        xhr.addEventListener(`timeout`, () => {
          onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
          window.mapFiltersContShow(true);
        });
        xhr.timeout = TIMEOUT_IN_MS;
      }

      xhr.open(method, url);
      xhr.send(data);
    };

    // return requestDirection;
  };


  dataRequest(`https://21.javascript.pages.academy/keksobooking`, `unload`, `POST`);
  dataRequest(`https://21.javascript.pages.academy/keksobooking/data`, `load`, `GET`);
})();
