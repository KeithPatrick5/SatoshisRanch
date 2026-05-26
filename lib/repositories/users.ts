import { prisma } from '@/lib/db';
export const usersRepo = {
  list: () => prisma.user.findMany({ orderBy: { createdAt: 'asc' } }),
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findByUsername: (username: string) => prisma.user.findUnique({ where: { username } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
};
