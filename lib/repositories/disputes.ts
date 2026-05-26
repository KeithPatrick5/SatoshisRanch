import { db } from '../db';
export function readDisputesState(){ return db.read(); }
export const disputesRepositoryStatus = 'local-json adapter active; database-backed implementation planned behind same repository interface';
