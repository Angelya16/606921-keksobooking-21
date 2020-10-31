'use strict';

//  __________________ popup - создание и отображение попапа метки
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

  let fragmentPopup = document.createDocumentFragment();

  let mapPin = window.mapPins.querySelectorAll(`button[class="map__pin"]`);

  const openPopup = (num) => {
    let windowPopup = window.mapPins.querySelector(`article`);

    if (windowPopup !== null) {
      window.mapPins.querySelector(`article`).remove();
    }

    fragmentPopup.appendChild(renderPopup(window.getGenerateAd[num]));
    window.mapPins.append(fragmentPopup);

    let popupCloseBtn = window.mapPins.querySelector(`.popup__close`);

    const closePopup = () => {
      document.removeEventListener(`keydown`, closePopup);
      popupCloseBtn.removeEventListener(`click`, closePopup);
      window.mapPins.querySelector(`article`).remove();
    };

    document.addEventListener(`keydown`, closePopup);
    popupCloseBtn.addEventListener(`click`, closePopup);
  };

  for (let i = 0; i < mapPin.length; i++) {
    mapPin[i].addEventListener(`click`, (evt) => {
      if (evt.which === 1) {
        openPopup(i);
      }
    });
  }
})();