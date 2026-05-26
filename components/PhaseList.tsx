import Link from 'next/link';
import { phaseList } from '@/lib/data';
export function PhaseList(){ return <table className="data-table phase-table"><thead><tr><th>#</th><th>Phase</th><th>Status</th></tr></thead><tbody>{phaseList.map(p=><tr key={p.number}><td>{p.number}</td><td><Link href={`/phases/${p.slug}`}>{p.title}</Link></td><td>implemented + audited locally</td></tr>)}</tbody></table> }
