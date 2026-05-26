import { ok, fail } from '@/lib/api/response';import { offersRepo } from '@/lib/repositories/offers';
export async function GET(_:Request,context:{params:Promise<{id:string}>}){const {id}=await context.params;const offer=await offersRepo.find(id);return offer?ok({offer}):fail('Offer not found',404)}
