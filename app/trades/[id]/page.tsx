export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';import { TradeRoom } from '@/components/TradeRoom';import { requireUser } from '@/lib/auth/session';
export default async function Trade({params}:{params:Promise<{id:string}>}){await requireUser();const {id}=await params;return <Shell><PageTitle title="Trade room" subtitle="Chat, timers, evidence, DB fake escrow, and guarded actions."/><TradeRoom id={id}/></Shell>}
