'use strict';

(function () {
  let xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener(`load`, () => {
    // console.log(xhr.status + ` ` + xhr.statusText);
    window.getAdData = xhr.response;
  });

  xhr.open(`GET`, `https://21.javascript.pages.academy/keksobooking/data`);

  xhr.send();
})();
