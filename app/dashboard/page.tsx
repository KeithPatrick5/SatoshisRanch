export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';import { AdminStats, AdminTrades, NotificationsTable } from '@/components/AdminTables';
export default function Dashboard(){return <Shell><PageTitle title="Dashboard" subtitle="User command center for open trades, wallet state, notifications, and warnings."/><AdminStats/><AdminTrades/><div className="box"><h2>Local notifications</h2><NotificationsTable/></div></Shell>}
