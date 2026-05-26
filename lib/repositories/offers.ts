import { prisma } from '@/lib/db';
export type OfferFilters = { country?: string; currency?: string; payment?: string; amount?: string | number };
export async function listOffers(filters: OfferFilters = {}) {
  const where: any = { status: { not: 'archived' } };
  if (filters.country && filters.country !== 'Any') where.country = filters.country;
  if (filters.currency && filters.currency !== 'Any') where.currency = filters.currency;
  if (filters.payment && filters.payment !== 'Any') where.paymentMethod = filters.payment;
  const amount = Number(filters.amount || 0);
  if (amount > 0) { where.minFiat = { lte: amount }; where.maxFiat = { gte: amount }; }
  return prisma.offer.findMany({ where, orderBy: [{ status: 'asc' }, { price: 'asc' }] });
}
export const offersRepo = {
  list: listOffers,
  find: (id: string) => prisma.offer.findUnique({ where: { id } }),
  create: (data: any) => prisma.offer.create({ data }),
  update: (id: string, data: any) => prisma.offer.update({ where: { id }, data }),
};
