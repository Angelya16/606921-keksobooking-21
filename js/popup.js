'use strict';

(function () {
  const TYPE_HOMES_RU = {
    'palace': `Дворец`,
    'flat': `Квартира`,
    'house': `Дом`,
    'bungalow': `Бунгало`
  };

  let popupCardTemplate = document.querySelector(`#card`).content;

  const renderPopup = (ad) => {
    let popupElement = popupCardTemplate.cloneNode(true);
    let popupPhotos = popupElement.querySelector(`.popup__photos`);

    popupElement.querySelector(`.popup__title`).textContent = ad.offer.title;
    popupElement.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    popupElement.querySelector(`.popup__text--price`).textContent = ad.offer.price + `₽/ночь`;
    popupElement.querySelector(`.popup__type`).textContent = TYPE_HOMES_RU[ad.offer.type];
    popupElement.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
    popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;

    for (let i = 0; i < window.featuresHomes.length; i++) {
      let popupFeatures = popupElement.querySelector(`.popup__features`);
      popupFeatures.children[i].style.display = `none`;
      for (let j = 0; j < ad.offer.features.length; j++) {
        let classListPopup = `popup__feature--` + ad.offer.features[j];
        if (popupFeatures.children[i].classList[1] === classListPopup) {
          popupFeatures.children[i].style.display = `inline-block`;
        }
      }
    }

    popupElement.querySelector(`.popup__description`).textContent = ad.offer.description;

    if (ad.offer.photos.length === 0) {
      popupPhotos.remove();
    } else {
      for (let i = 0; i < ad.offer.photos.length; i++) {
        let popupPhoto = popupPhotos.querySelector(`.popup__photo`).cloneNode();
        popupPhoto.src = ad.offer.photos[i];
        popupPhotos.append(popupPhoto);
      }
      popupPhotos.children[0].remove();
    }

    popupElement.querySelector(`.popup__avatar`).src = ad.author.avatar;

    return popupElement;
  };

  window.controlPopup = (num, value) => {
    let fragmentPopup = document.createDocumentFragment();
    let windowPopup = window.mapPins.querySelector(`article`);

    if (windowPopup !== null) {
      window.mapPins.querySelector(`article`).remove();
    }
    if (value === `ad`) {
      fragmentPopup.appendChild(renderPopup(window.getAdData[num]));
      window.mapPins.append(fragmentPopup);
    }
  };

  window.openPopup = (num) => {
    window.controlPopup(num, `ad`);
    let popupCloseBtn = window.mapPins.querySelector(`.popup__close`);
    const closePopup = (evt) => {
      if (evt.key === `Escape` || evt.type === `click`) {
        document.removeEventListener(`keydown`, closePopup);
        popupCloseBtn.removeEventListener(`click`, closePopup);
        window.controlPopup(num);
      }
    };
    document.addEventListener(`keydown`, closePopup);
    popupCloseBtn.addEventListener(`click`, closePopup);
  };

})();
