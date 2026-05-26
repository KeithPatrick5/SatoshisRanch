import { prisma } from '@/lib/db';
export const walletRepo = {
  withdrawals: () => prisma.btcWithdrawal.findMany({ orderBy: { createdAt: 'desc' } }),
  findWithdrawal: (id: string) => prisma.btcWithdrawal.findUnique({ where: { id } }),
  createWithdrawal: (data: any) => prisma.btcWithdrawal.create({ data }),
  updateWithdrawal: (id: string, data: any) => prisma.btcWithdrawal.update({ where: { id }, data }),
};
