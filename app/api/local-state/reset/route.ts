export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';import { resetState } from '@/lib/local-store';
export async function POST(){resetState();redirect('/')}
