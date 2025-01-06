import { Review } from '../types/reviews';

export const reviews: Review [] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a1',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    comment:
      'A quiet cozy ',
    rating: 4,
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a2',
    date: '2020-08-08T14:13:56.569Z',
    user: {
      name: 'Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: true,
    },
    comment:
      'River by the unique lightness of Amsterdam.',
    rating: 3,
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a3',
    date: '2021-09-08T14:13:56.569Z',
    user: {
      name: 'Max',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 5,
  },
];
