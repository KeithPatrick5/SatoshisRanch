export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';import { TradeRoom } from '@/components/TradeRoom';
export default async function Trade({params}:{params:Promise<{id:string}>}){const {id}=await params;return <Shell><PageTitle title="Trade room" subtitle="Chat, timers, evidence, local fake escrow, and guarded actions."/><TradeRoom id={id}/></Shell>}