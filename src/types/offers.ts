import { BaseOffer } from './full-info-offer';

export type Offer = BaseOffer & {
  previewImage: string;
};

export type Offers = Offer[];
