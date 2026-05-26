import { db } from '../db';
export function listSessions(){ return db.read().sessions; }
export function findSession(id:string){ return db.read().sessions.find(s=>s.id===id); }
