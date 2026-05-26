export const dynamic = 'force-dynamic';
import { phaseList } from '@/lib/data';export async function GET(){return Response.json({phases:phaseList});}