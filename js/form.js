'use strict';

//  __________________ form - валидация и работа формы объявления
(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const TYPE_HOMES_MIN_SUM = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalow': 0
  };

  let adForm = document.querySelector(`.ad-form`);
  let adFormFieldset = adForm.children;
  let adAddress = adForm.querySelector(`#address`);

  const adFormDisabled = (boolean) => {
    for (let i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = boolean;
    }
    if (!boolean) {
      adForm.classList.remove(`ad-form--disabled`);
    } else {
      adForm.classList.add(`ad-form--disabled`);
    }
  };
  adFormDisabled(true);

  let mapPinMain = document.querySelector(`.map__pin--main`);


  adAddress.value = `${mapPinMain.offsetLeft - mapPinMain.clientWidth / 2}, ${mapPinMain.offsetTop - mapPinMain.clientHeight / 2}`;

  const getStartedMap = () => {
    adFormDisabled(false);
    window.map.classList.remove(`map--faded`);
    adAddress.value = `${mapPinMain.offsetLeft - mapPinMain.clientWidth / 2}, ${mapPinMain.offsetTop - (mapPinMain.clientHeight / 2) + 22}`;
    quantityRoomsAndGuests();
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      getStartedMap();
    }
  });
  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      getStartedMap();
    }
  });

  let titleInput = adForm.querySelector(`#title`);

  titleInput.addEventListener(`input`, () => {
    let valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Маленький заголовок! Введите ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Заголовок длинный! Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  });

  let priceInput = adForm.querySelector(`#price`);
  let typeHomeSelect = adForm.querySelector(`#type`);

  const choiceTypeHome = () => {
    if (priceInput.value > 0) {
      if (priceInput.validity.rangeOverflow) {
        priceInput.setCustomValidity(`Сумма завышена`);
      } else if (priceInput.value < TYPE_HOMES_MIN_SUM[typeHomeSelect.value]) {
        priceInput.setCustomValidity(`Сумма занижена, минимальная цена ` + TYPE_HOMES_MIN_SUM[typeHomeSelect.value]);
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
    priceInput.placeholder = TYPE_HOMES_MIN_SUM[typeHomeSelect.value];
    choiceTypeHome();
  });

  priceInput.addEventListener(`input`, choiceTypeHome);

  let timeinSelect = adForm.querySelector(`#timein`);
  let timeoutSelect = adForm.querySelector(`#timeout`);

  const choiceTime = (evt) => {
    let totalVal = evt.target.value;
    timeinSelect.value = totalVal;
    timeoutSelect.value = totalVal;
  };

  timeinSelect.addEventListener(`change`, choiceTime);
  timeoutSelect.addEventListener(`change`, choiceTime);

  let roomNumSelect = adForm.querySelector(`#room_number`);
  let capacitySelect = adForm.querySelector(`#capacity`);

  if (roomNumSelect.value < capacitySelect.value) {
    capacitySelect.setCustomValidity(`Слишком большое количество гостей`);
  }

  const quantityRoomsAndGuests = (evt) => {
    let penultValueRoom = roomNumSelect.length - 2;
    let lastIndexGuest = capacitySelect.length - 1;
    try {
      if (evt.type === `change`) {
        if (capacitySelect.value > roomNumSelect.value || capacitySelect.selectedIndex === lastIndexGuest) {
          capacitySelect.value = roomNumSelect.value;
        }
        capacitySelect.setCustomValidity(``);
      }
    } catch (err) {
      evt = undefined;
    }
    if (roomNumSelect.selectedIndex === 3) {
      capacitySelect.value = 0;
      for (let i = 0; i < lastIndexGuest; i++) {
        capacitySelect.options[i].style.display = `none`;
        capacitySelect.disabled = true;
        capacitySelect.setCustomValidity(``);
      }
    } else if (roomNumSelect.selectedIndex !== 3) {
      capacitySelect.disabled = false;
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
    roomNumSelect.reportValidity();
  };
  roomNumSelect.addEventListener(`change`, quantityRoomsAndGuests);
})();