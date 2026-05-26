import { db } from '../db';
export function readMessagesState(){ return db.read(); }
export const messagesRepositoryStatus = 'local-json adapter active; database-backed implementation planned behind same repository interface';
