'use strict';

(function () {
  let FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  window.photoUpload = (fileChooser, preview) => {

    fileChooser.addEventListener(`change`, () => {
      let file = fileChooser.files[0];
      let fileName = file.name.toLowerCase();

      let matches = FILE_TYPES.some((it) => {
        return fileName.endsWith(it);
      });

      if (matches) {
        let reader = new FileReader();

        reader.addEventListener(`load`, () => {
          if (preview.src) {
            preview.src = reader.result;
          } else {
            preview.style.background = `url(${reader.result})` + `no-repeat`;
            preview.style.backgroundSize = `cover`;
          }
        });

        reader.readAsDataURL(file);
      }
    });

  };

})();
