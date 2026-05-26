export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';import { runLocalWorkers } from '@/lib/workers';
export async function POST(){runLocalWorkers();redirect('/admin/ops')}
export async function GET(){return Response.json({runs:runLocalWorkers()})}
