import { db } from '../db';
export function readNotificationsState(){ return db.read(); }
export const notificationsRepositoryStatus = 'local-json adapter active; database-backed implementation planned behind same repository interface';
