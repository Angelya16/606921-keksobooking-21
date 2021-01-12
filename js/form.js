'use strict';

(function () {

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const TypeHomesMinSum = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalow': 0
  };

  const adForm = window.adFormGlobal;
  const adFormFieldset = adForm.children;
  const clearFormBtn = adForm.querySelector(`.ad-form__reset`);

  const avatarUpload = adForm.querySelector(`.ad-form__field  input[type=file]`);
  const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
  const photoHomeUpload = adForm.querySelector(`.ad-form__upload  input[type=file]`);
  const photoHomePreview = adForm.querySelector(`.ad-form__photo`);

  window.formDisabled = (boolean) => {
    for (let i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = boolean;
    }
    if (!boolean) {
      adForm.classList.remove(`ad-form--disabled`);
    } else {
      adForm.classList.add(`ad-form--disabled`);
    }
  };
  window.formDisabled(true);

  const titleInput = adForm.querySelector(`#title`);

  titleInput.addEventListener(`input`, () => {
    const valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Маленький заголовок! Введите ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Заголовок длинный! Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  });


  const priceInput = adForm.querySelector(`#price`);
  const typeHomeSelect = adForm.querySelector(`#type`);

  const choiceTypeHome = () => {
    if (priceInput.value > 0) {
      if (priceInput.validity.rangeOverflow) {
        priceInput.setCustomValidity(`Сумма завышена`);
      } else if (priceInput.value < TypeHomesMinSum[typeHomeSelect.value]) {
        priceInput.setCustomValidity(`Сумма занижена, минимальная цена ` + TypeHomesMinSum[typeHomeSelect.value]);
      } else if (priceInput.validity.rangeUnderflow) {
        priceInput.setCustomValidity(`Сумма не может быть отрицательной`);
      } else if (priceInput.validity.stepMismatch) {
        priceInput.setCustomValidity(`Укажите целое число, без знаков препинания`);
      } else if (priceInput.validity.valueMissing) {
        priceInput.setCustomValidity(`Обязательное поле`);
      } else {
        priceInput.setCustomValidity(``);
      }
    }

    priceInput.reportValidity();
  };

  typeHomeSelect.addEventListener(`change`, () => {
    priceInput.placeholder = TypeHomesMinSum[typeHomeSelect.value];
    choiceTypeHome();
  });

  priceInput.addEventListener(`input`, choiceTypeHome);


  const timeinSelect = adForm.querySelector(`#timein`);
  const timeoutSelect = adForm.querySelector(`#timeout`);

  const choiceTime = (evt) => {
    const totalVal = evt.target.value;
    timeinSelect.value = totalVal;
    timeoutSelect.value = totalVal;
  };

  timeinSelect.addEventListener(`change`, choiceTime);
  timeoutSelect.addEventListener(`change`, choiceTime);


  const roomNumSelect = adForm.querySelector(`#room_number`);
  const capacitySelect = adForm.querySelector(`#capacity`);

  const quantityRoomsAndGuests = () => {
    const penultValueRoom = roomNumSelect.length - 2;
    const lastIndexGuest = capacitySelect.length - 1;

    if (capacitySelect.value > roomNumSelect.value || capacitySelect.selectedIndex === lastIndexGuest) {
      capacitySelect.value = roomNumSelect.value;
    }
    if (roomNumSelect.selectedIndex === 3) {
      capacitySelect.value = 0;
      for (let i = 0; i < lastIndexGuest; i++) {
        capacitySelect.options[i].style.display = `none`;
        capacitySelect.options[lastIndexGuest].style.display = `block`;
      }
    } else if (roomNumSelect.selectedIndex !== 3) {
      for (let i = roomNumSelect.length - 2; i >= (penultValueRoom) - roomNumSelect.selectedIndex; i--) {
        for (let j = 0; j < capacitySelect.length - roomNumSelect.value; j++) {
          capacitySelect.options[i].style.display = `block`;
          if (j !== i) {
            capacitySelect.options[j].style.display = `none`;
          }
          capacitySelect.options[lastIndexGuest].style.display = `none`;
        }
      }
    }
  };


  window.startValuesForm = (evt) => {
    if (window.isActiveMap) {
      evt.preventDefault();
      if (evt.type === `submit`) {
        window.getEndedMap();
      }
    }

    window.restartFiltersValues = false;
    adForm.reset();
    priceInput.placeholder = 5000;
    quantityRoomsAndGuests();
    window.controlPopup();
    window.startPosMainPin();
    avatarPreview.src = `img/muffin-grey.svg`;
    photoHomePreview.style.background = `#e4e4de`;
  };

  window.startValuesForm();

  roomNumSelect.addEventListener(`change`, quantityRoomsAndGuests);

  window.photoUpload(avatarUpload, avatarPreview);
  window.photoUpload(photoHomeUpload, photoHomePreview);

  clearFormBtn.addEventListener(`click`, window.startValuesForm);

  adForm.addEventListener(`submit`, (evt) => {
    window.unload(new FormData(adForm), () => {
      window.startValuesForm(evt);
      window.succesHandler();
    });
    evt.preventDefault();
  });
})();
