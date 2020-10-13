'use strict';

const map = document.querySelector('.map');

map.classList.remove('map--faded');

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

let rndCoordinates = [...Array(8).keys()].map(() => ({
  x: random(0, map.clientWidth),
  y: random(130, 630)

}));

const TYPE_HOMES = ['palace', 'flat', 'house', 'bungalow'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];

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
    rooms: random(1, 100),
    guests: random(0, 3),
    checkin: CHECK_TIMES[random(0, CHECK_TIMES.length)],
    checkout: CHECK_TIMES[random(0, CHECK_TIMES.length)],
    features: ((num) => featuresHomes.slice(random(0, num), random(num, featuresHomes.length)))(random(0, featuresHomes.length - 1)),
    description: adTitles[id],
    photos: ((num) => photosHomes.slice(random(0, num), random(num, photosHomes.length)))(random(0, photosHomes.length - 1)),
  },
  location: {
    x: rndCoordinates[id].x,
    y: rndCoordinates[id].y
  }
}));


let mapPinTemplate = document.querySelector('#pin').content;

let renderAd = (ad) => {
  let adElement = mapPinTemplate.cloneNode(true);

  adElement.querySelector('.map__pin').style.left = ad.location.x + '15px';
  adElement.querySelector('.map__pin').style.top = ad.location.y + '15px';

  let picture = adElement.querySelector('img');
  picture.src = ad.author.avatar;
  picture.alt = ad.offer.title;

  return adElement;
}

let fragment = document.createDocumentFragment();
for (let i = 0; i < getGenerateAd.length; i++) {
  fragment.appendChild(renderAd(getGenerateAd[i]));
}
mapPinTemplate.appendChild(fragment);
