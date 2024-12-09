import { BaseOffer } from './offer';

export type Offer = BaseOffer & {
  previewImage: string;
};

export type Offers = Offer[];
