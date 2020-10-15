'use strict';

const TYPE_HOMES = ['palace', 'flat', 'house', 'bungalow'];

const TYPE_HOMES_RU = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало'
};

const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const map = document.querySelector('.map');

map.classList.remove('map--faded');

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

let rndCoordinates = [...Array(8).keys()].map(() => ({
  x: random(0, map.clientWidth),
  y: random(130, 630)

}));

let adTitles = ["Домик на ночь", "Привал странника", "Просторные хоромы", "Место для тусэ", "Хата для отдыха", "Внимание! Шикарное местечко", "Мур-мяу", "Скромная лачуга"];

let featuresHomes = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

let photosHomes = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

const getGenerateAd = [...Array(8).keys()].map((id) => ({
  author: {
    avatar: `img/avatars/user0${id + 1}.png`
  },
  offer: {
    title: adTitles[id],
    address: String(rndCoordinates[id].x + ', ' + rndCoordinates[id].y),
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


let mapPinTemplate = document.querySelector('#pin').content;
let mapPins = document.querySelector('.map__pins');

let renderAd = (ad) => {
  let adElement = mapPinTemplate.cloneNode(true);

  adElement.querySelector('.map__pin').style.left = ad.location.x + 15 + 'px';
  adElement.querySelector('.map__pin').style.top = ad.location.y + 15 + 'px';

  let picture = adElement.querySelector('img');
  picture.src = ad.author.avatar;
  picture.alt = ad.offer.title;

  return adElement;
};

let fragment = document.createDocumentFragment();
for (let i = 0; i < getGenerateAd.length; i++) {
  fragment.appendChild(renderAd(getGenerateAd[i]));
}
mapPins.appendChild(fragment);


let popupCardTemplate = document.querySelector('#card').content;

// let popupCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// let mapCard = popupCardTemplate.querySelector('.map__card');

let renderPopup = (ad) => {
  let popupElement = popupCardTemplate.cloneNode(true);
  let popupPhotos = popupElement.querySelector('.popup__photos');

  popupElement.querySelector('.popup__title').textContent = ad.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  popupElement.querySelector('.popup__type').textContent = TYPE_HOMES_RU[ad.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  for (let i = 0; i < featuresHomes.length; i++) {
    let popupFeatures = popupElement.querySelector('.popup__features');
    popupFeatures.children[i].style.display = 'none';
    for (let j = 0; j < ad.offer.features.length; j++) {
      let classListPopup = 'popup__feature--' + ad.offer.features[j];
      if (popupFeatures.children[i].classList[1] === classListPopup) {
        popupFeatures.children[i].style.display = 'inline-block';
      }
    }
  }

  popupElement.querySelector('.popup__description').textContent = ad.offer.description;

  if (ad.offer.photos.length === 0) {
    popupPhotos.remove();
  } else {
    for (let i = 0; i < ad.offer.photos.length; i++) {
      let popupPhoto = popupPhotos.querySelector('.popup__photo').cloneNode();
      popupPhoto.src = ad.offer.photos[i];
      popupPhotos.append(popupPhoto);
    }
    popupPhotos.children[0].remove();
  }

  popupElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return popupElement;
};
// let fragmentPopup = document.createDocumentFragment();
// for (let i = 0; i < getGenerateAd.length; i++) {
//   fragmentPopup.appendChild(renderPopup(getGenerateAd[i]));
// }

// mapPins.append(fragmentPopup);

let fragmentPopup = document.createDocumentFragment();
fragmentPopup.appendChild(renderPopup(getGenerateAd[random(1, 8)]));


mapPins.append(fragmentPopup);
// mapPins.append(popupCardTemplate);
