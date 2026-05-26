import { requireAdmin } from '@/lib/auth/session';
export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';import { LedgerTable, LedgerAuditTable, AuditLogTable } from '@/components/AdminTables';export default async function Ledger(){await requireAdmin();return <Shell><PageTitle title="Ledger audit" subtitle="Every transaction group must balance to zero."/><LedgerAuditTable/><LedgerTable/><div className="box"><h2>Runtime audit trail</h2><AuditLogTable/></div></Shell>}
