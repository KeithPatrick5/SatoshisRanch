import { db } from '../db';
export function readWalletState(){ return db.read(); }
export const walletRepositoryStatus = 'local-json adapter active; database-backed implementation planned behind same repository interface';
