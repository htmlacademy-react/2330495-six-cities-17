import { Offers } from '../types/offers';

const offerListTotal: Offers = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: 'Beautiful location',
    type: 'house',
    price: 500,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 5,
    previewImage: 'https://url-to-image/image.png',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f02',
    title: 'Beautiful & luxurious studio ',
    type: 'apartment',
    price: 140,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13,
    },
    isFavorite: false,
    isPremium: false,
    rating: 5,
    previewImage: 'https://url-to-image/image.png',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f03',
    title: 'Luxurious studio at great location',
    type: 'room',
    price: 200,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 13,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'https://url-to-image/image.png',
  },
  {
    id: '06dbd96a-8880-43f7-94ea-b2c6a466c2ce',
    title: 'Waterfront with extraordinary view',
    type: 'room',
    price: 105,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.5,
  },
  {
    id: '8178aab6-0e45-47d5-b786-230e20abb877',
    title: 'The house among olive ',
    type: 'room',
    price: 253,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
  },
];

export default offerListTotal;
