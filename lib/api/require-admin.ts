import { readState } from '../local-store';
export function requireLocalAdmin(){ const admin = readState().users.find((u)=>u.role==='admin'||u.role==='SUPER_ADMIN'||u.role==='ADMIN'); if(!admin) throw new Error('Admin required'); return admin; }
