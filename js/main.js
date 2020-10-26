/* eslint-disable no-unused-vars */
'use strict';

const TYPE_HOMES = [`palace`, `flat`, `house`, `bungalow`];

// const TYPE_HOMES_RU = {
//   'palace': `Дворец`,
//   'flat': `Квартира`,
//   'house': `Дом`,
//   'bungalow': `Бунгало`
// };

const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];

const map = document.querySelector(`.map`);

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

let rndCoordinates = [...Array(8).keys()].map(() => ({
  x: random(0, map.clientWidth),
  y: random(130, 630)

}));

let adTitles = [`Домик на ночь`, `Привал странника`, `Просторные хоромы`, `Место для тусэ`, `Хата для отдыха`, `Внимание! Шикарное местечко`, `Мур-мяу`, `Скромная лачуга`];

let featuresHomes = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

let photosHomes = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const getGenerateAd = [...Array(8).keys()].map((id) => ({
  author: {
    avatar: `img/avatars/user0${id + 1}.png`
  },
  offer: {
    title: adTitles[id],
    address: String(rndCoordinates[id].x + `, ` + rndCoordinates[id].y),
    price: random(5000, 50000),
    type: TYPE_HOMES[random(0, TYPE_HOMES.length)],
    rooms: random(1, 4),
    guests: random(0, 100),
    checkin: CHECK_TIMES[random(0, CHECK_TIMES.length)],
    checkout: CHECK_TIMES[random(0, CHECK_TIMES.length)],
    features: ((num) => featuresHomes.slice(random(0, num), random(num, featuresHomes.length)))(random(0, featuresHomes.length - 1)),
    description: adTitles[id],
    photos: ((num) => photosHomes.slice(random(0, num), random(num, photosHomes.length)))(random(0, photosHomes.length - 1))
  },
  location: {
    x: rndCoordinates[id].x,
    y: rndCoordinates[id].y
  }
}));


let mapPinTemplate = document.querySelector(`#pin`).content;
let mapPins = document.querySelector(`.map__pins`);

// eslint-disable-next-line no-unused-vars
const renderAd = (ad) => {
  let adElement = mapPinTemplate.cloneNode(true);

  adElement.querySelector(`.map__pin`).style.left = ad.location.x + 15 + `px`;
  adElement.querySelector(`.map__pin`).style.top = ad.location.y + 15 + `px`;

  let picture = adElement.querySelector(`img`);
  picture.src = ad.author.avatar;
  picture.alt = ad.offer.title;

  return adElement;
};

// const addPinsToMap = () => {
//   let fragment = document.createDocumentFragment();
//   for (let i = 0; i < getGenerateAd.length; i++) {
//     fragment.appendChild(renderAd(getGenerateAd[i]));
//   }
//   mapPins.appendChild(fragment);
// };

// addPinsToMap();

// let popupCardTemplate = document.querySelector(`#card`).content;

// let renderPopup = (ad) => {
//   let popupElement = popupCardTemplate.cloneNode(true);
//   let popupPhotos = popupElement.querySelector(`.popup__photos`);

//   popupElement.querySelector(`.popup__title`).textContent = ad.offer.title;
//   popupElement.querySelector(`.popup__text--address`).textContent = ad.offer.address;
//   popupElement.querySelector(`.popup__text--price`).textContent = ad.offer.price + `₽/ночь`;
//   popupElement.querySelector(`.popup__type`).textContent = TYPE_HOMES_RU[ad.offer.type];
//   popupElement.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
//   popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;

//   for (let i = 0; i < featuresHomes.length; i++) {
//     let popupFeatures = popupElement.querySelector(`.popup__features`);
//     popupFeatures.children[i].style.display = `none`;
//     for (let j = 0; j < ad.offer.features.length; j++) {
//       let classListPopup = `popup__feature--` + ad.offer.features[j];
//       if (popupFeatures.children[i].classList[1] === classListPopup) {
//         popupFeatures.children[i].style.display = `inline-block`;
//       }
//     }
//   }

//   popupElement.querySelector(`.popup__description`).textContent = ad.offer.description;

//   if (ad.offer.photos.length === 0) {
//     popupPhotos.remove();
//   } else {
//     for (let i = 0; i < ad.offer.photos.length; i++) {
//       let popupPhoto = popupPhotos.querySelector(`.popup__photo`).cloneNode();
//       popupPhoto.src = ad.offer.photos[i];
//       popupPhotos.append(popupPhoto);
//     }
//     popupPhotos.children[0].remove();
//   }

//   popupElement.querySelector(`.popup__avatar`).src = ad.author.avatar;

//   return popupElement;
// };

// let fragmentPopup = document.createDocumentFragment();
// fragmentPopup.appendChild(renderPopup(getGenerateAd[random(1, 8)]));

// mapPins.append(fragmentPopup);

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

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.which === 1) {
    adFormDisabled(false);
    map.classList.remove(`map--faded`);
    adAddress.value = `${mapPinMain.offsetLeft - mapPinMain.clientWidth / 2}, ${mapPinMain.offsetTop - (mapPinMain.clientHeight / 2) + 22}`;
    quantityRoomsAndGuests();
  }
});
mapPinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    adFormDisabled(false);
  }
});

// mapPinMain.addEventListener(`mousemove`, (evt) => {
//   console.log(evt.clientX, evt.clientY);
// });

let titleInput = adForm.querySelector(`#title`);

// titleInput.addEventListener(`invalid`, () => {
//   if (titleInput.validity.tooShort) {
//     titleInput.setCustomValidity(`Заголовок должен состоять минимум из 30-ти символов`);
//   } else if (titleInput.validity.tooLong) {
//     titleInput.setCustomValidity(`Заголовок не должен превышать 100 символов`);
//   } else if (titleInput.validity.valueMissing) {
//     titleInput.setCustomValidity(`Обязательное поле`);
//   } else {
//     titleInput.setCustomValidity(``);
//   }
// });

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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

const TYPE_HOMES_MIN_SUM = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0
};

let priceInput = adForm.querySelector(`#price`);
let typeHomeSelect = adForm.querySelector(`#type`);

let choiceTypeHome = () => {
  // this.value = this.value.replace(/[^0-9\.]/g, ``);
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
  // eslint-disable-next-line semi
}


typeHomeSelect.addEventListener(`change`, () => {
  priceInput.placeholder = TYPE_HOMES_MIN_SUM[typeHomeSelect.value];
  choiceTypeHome();
});

priceInput.addEventListener(`input`, choiceTypeHome);

let timeinSelect = adForm.querySelector(`#timein`);
let timeoutSelect = adForm.querySelector(`#timeout`);

let choiceTime = (evt) => {
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

let quantityRoomsAndGuests = (evt) => {
  try {
    if (evt.type === `change`) {
      if (capacitySelect.value > roomNumSelect.value || capacitySelect.selectedIndex === 3) {
        capacitySelect.value = roomNumSelect.value;
      }
      capacitySelect.setCustomValidity(``);
    }
  } catch (err) {
    evt = undefined;
  }
  if (roomNumSelect.selectedIndex === 3) {
    capacitySelect.value = 0;
    for (let i = 0; i < capacitySelect.length - 1; i++) {
      capacitySelect.options[i].style.display = `none`;
      capacitySelect.disabled = true;
      capacitySelect.setCustomValidity(``);
    }
  } else if (roomNumSelect.selectedIndex !== 3) {
    capacitySelect.disabled = false;
    for (let i = roomNumSelect.length - 2; i >= (roomNumSelect.length - 2) - roomNumSelect.selectedIndex; i--) {
      for (let j = 0; j < capacitySelect.length - roomNumSelect.value; j++) {
        capacitySelect.options[i].style.display = `block`;
        if (j !== i) {
          capacitySelect.options[j].style.display = `none`;
        }
        capacitySelect.options[capacitySelect.length - 1].style.display = `none`;
      }
    }
  }
  roomNumSelect.reportValidity();
};
roomNumSelect.addEventListener(`change`, quantityRoomsAndGuests);
