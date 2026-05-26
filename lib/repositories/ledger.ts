import { db } from '../db';
export function readLedgerState(){ return db.read(); }
export const ledgerRepositoryStatus = 'local-json adapter active; database-backed implementation planned behind same repository interface';
