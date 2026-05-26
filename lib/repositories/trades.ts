import { db } from '../db';
export function readTradesState(){ return db.read(); }
export const tradesRepositoryStatus = 'local-json adapter active; database-backed implementation planned behind same repository interface';
