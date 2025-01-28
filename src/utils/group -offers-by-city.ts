import { Offer } from '../types/offers';

export function groupOffersByCity(offers: Offer[]) {
  const groupedOffers: Record<string, Offer[]> = {};

  offers.forEach((offer) => {
    const city = offer.city.name;
    groupedOffers[city] = groupedOffers[city] ?? [];
    groupedOffers[city].push(offer);
  });

  return groupedOffers;
}
