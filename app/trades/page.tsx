export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';import { AdminTrades } from '@/components/AdminTables';
export default function Trades(){return <Shell><PageTitle title="My trades" subtitle="Local fixture trades showing the strict state machine."/><AdminTrades/></Shell>}
