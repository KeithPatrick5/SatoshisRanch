import { requireAdmin } from '@/lib/auth/session';
export const dynamic = 'force-dynamic';
import Link from 'next/link';import { Shell, PageTitle } from '@/components/Shell';
import { AdminStats, AdminTrades } from '@/components/AdminTables';
export default async function Admin(){await requireAdmin();return <Shell><PageTitle title="Ranch Office" subtitle="Admin command center: trades, wallet, disputes, users, risk."/><AdminStats/><div className="box"><h2>Admin sections</h2><div className="button-row"><Link className="button" href="/admin/trades">Trades</Link><Link className="button" href="/admin/disputes">Disputes</Link><Link className="button" href="/admin/users">Users & sellers</Link><Link className="button" href="/admin/wallet">Wallet</Link><Link className="button" href="/admin/ledger">Ledger</Link><Link className="button" href="/admin/risk">Risk</Link><Link className="button" href="/admin/ops">Ops</Link></div></div><AdminTrades/></Shell>}
