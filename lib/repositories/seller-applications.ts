import { prisma } from '@/lib/db';
export const sellerApplicationsRepo = {
  list: () => prisma.sellerApplication.findMany({ orderBy: { createdAt: 'desc' } }),
  find: (id: string) => prisma.sellerApplication.findUnique({ where: { id } }),
  create: (data: any) => prisma.sellerApplication.create({ data }),
  update: (id: string, data: any) => prisma.sellerApplication.update({ where: { id }, data }),
};
