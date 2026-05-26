export const dynamic = 'force-dynamic';
import { Shell, PageTitle } from '@/components/Shell';
export default function Login(){return <Shell><PageTitle title="Login" subtitle="Local mock login. Creates a local session record only."/><form className="box stack" method="post" action="/api/auth/login"><label>Username<input name="username" defaultValue="northbank"/></label><label>Password<input name="password" type="password" defaultValue="local-only"/></label><button>Login locally</button></form></Shell>}
