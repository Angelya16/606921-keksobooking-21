'use strict';

(function () {
  let DEBOUNCE_INTERVAL = 500;

  window.debounce = (cb, ms) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      if (ms === undefined) {
        ms = DEBOUNCE_INTERVAL;
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, ms);

    };
  };
})();
