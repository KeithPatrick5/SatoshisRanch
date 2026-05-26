import { db } from '../db';
export function readAuditState(){ return db.read(); }
export const auditRepositoryStatus = 'local-json adapter active; database-backed implementation planned behind same repository interface';
