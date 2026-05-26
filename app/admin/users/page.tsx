import { requireAdmin } from '@/lib/auth/session';
export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';import { AdminUsers, SellerApplicationsTable } from '@/components/AdminTables';export default async function Users(){await requireAdmin();return <Shell><PageTitle title="Admin users" subtitle="Search, freeze, ban, annotate, and review sellers."/><div className="box"><h2>Seller applications</h2><SellerApplicationsTable/></div><div className="box"><h2>Users</h2><AdminUsers/></div></Shell>}
