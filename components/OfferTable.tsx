import Link from 'next/link';
import { filterOffers, formatMoney, formatSats } from '@/lib/data';
import { getCsrfToken } from '@/lib/api/csrf';

export async function OfferTable({searchParams}:{searchParams?:{[key:string]: string | string[] | undefined}}){
 const offers = await filterOffers(searchParams);
 const csrf = await getCsrfToken();
 return <table className="data-table"><thead><tr><th>Seller</th><th>Price/BTC</th><th>Limits</th><th>Payment method</th><th>Available</th><th>Rating</th><th>Release</th><th>Status</th><th></th></tr></thead><tbody>{offers.map((o:any)=><tr key={o.id}><td><Link href={`/traders/${o.seller}`}>{o.seller}</Link></td><td>{formatMoney(o.price,o.currency)}</td><td>{formatMoney(o.minFiat,o.currency)} - {formatMoney(o.maxFiat,o.currency)}</td><td>{o.paymentMethod}</td><td>{formatSats(o.availableSats)}</td><td>{o.rating}</td><td>{o.release}</td><td>{o.status}</td><td><Link className="button small" href={`/offers/${o.id}`}>Buy</Link><form method="post" action={`/api/offers/${o.id}/pause`}><input type="hidden" name="_csrf" value={csrf}/><button className="button small" disabled={o.status!=='open'}>Pause</button></form><form method="post" action={`/api/offers/${o.id}/resume`}><input type="hidden" name="_csrf" value={csrf}/><button className="button small" disabled={o.status==='open'}>Resume</button></form></td></tr>)}{!offers.length && <tr><td colSpan={9}>No offers match those filters.</td></tr>}</tbody></table>
}
export function MarketFilters({searchParams}:{searchParams?:{[key:string]: string | string[] | undefined}}){
 const v = (key:string, fallback:string) => typeof searchParams?.[key] === 'string' ? String(searchParams?.[key]) : fallback;
 return <form className="filters" method="get"><label>Country<select name="country" defaultValue={v('country','Mexico')}><option>Any</option><option>Mexico</option><option>United States</option></select></label><label>Currency<select name="currency" defaultValue={v('currency','MXN')}><option>Any</option><option>MXN</option><option>USD</option></select></label><label>Payment<select name="payment" defaultValue={v('payment','Any')}><option>Any</option><option>SPEI bank transfer</option><option>Cash deposit</option><option>Zelle approved traders</option><option>Wise</option></select></label><label>Amount<input name="amount" defaultValue={v('amount','')} placeholder="2000" /></label><button type="submit">Search</button><Link className="button" href="/buy-bitcoin">Reset</Link></form>
}
