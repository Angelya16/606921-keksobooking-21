'use strict';

(function () {
  let FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  // var fileChooser = document.querySelector('.upload input[type=file]');
  // var preview = document.querySelector('.setup-user-pic');

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
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });

  };

})();
