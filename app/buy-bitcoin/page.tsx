export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';import { MarketFilters, OfferTable } from '@/components/OfferTable';
export default async function Buy({searchParams}:{searchParams:Promise<{[key:string]: string | string[] | undefined}>}){const sp=await searchParams;return <Shell><PageTitle title="Buy Bitcoin" subtitle="Filter trusted Ranch sellers by market, payment method, and limit."/><MarketFilters searchParams={sp}/><OfferTable searchParams={sp}/></Shell>}
