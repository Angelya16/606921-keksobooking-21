'use strict';

//  __________________ pin - отображение и создание метки объявления
(function () {
  let mapPinTemplate = document.querySelector(`#pin`).content;
  window.mapPins = document.querySelector(`.map__pins`);

  const renderAdPin = (ad) => {
    let adElement = mapPinTemplate.cloneNode(true);

    adElement.querySelector(`.map__pin`).style.left = ad.location.x + 15 + `px`;
    adElement.querySelector(`.map__pin`).style.top = ad.location.y + 15 + `px`;

    let picture = adElement.querySelector(`img`);
    picture.src = ad.author.avatar;
    picture.alt = ad.offer.title;

    return adElement;
  };

  let fragment = document.createDocumentFragment();
  for (let i = 0; i < window.getGenerateAd.length; i++) {
    fragment.appendChild(renderAdPin(window.getGenerateAd[i]));
  }
  window.mapPins.appendChild(fragment);
})();
