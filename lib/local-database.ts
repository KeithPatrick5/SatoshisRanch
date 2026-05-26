import fs from 'fs';
import path from 'path';
import { appendAudit, readState, writeState } from './local-store';
import type { LocalState } from './types';

const lockPath = path.join(process.cwd(), 'data', 'local-db-lock.json');

export type LocalDbTransaction<T> = (state: LocalState) => T;

export function withLocalDbTransaction<T>(actor: string, action: string, tx: LocalDbTransaction<T>): T {
  const startedAt = new Date().toISOString();
  if (fs.existsSync(lockPath)) {
    throw new Error('Local database lock exists. Another local transaction may be running. Remove data/local-db-lock.json only if the app is stopped.');
  }
  fs.writeFileSync(lockPath, JSON.stringify({ actor, action, startedAt }, null, 2));
  try {
    const state = readState();
    const result = tx(state);
    appendAudit(state, actor, `db.tx.${action}`, 'local-file-db', 'Committed local database transaction.');
    writeState(state);
    return result;
  } catch (error) {
    const state = readState();
    appendAudit(state, actor, `db.tx.${action}.failed`, 'local-file-db', error instanceof Error ? error.message : 'Unknown local transaction failure.');
    writeState(state);
    throw error;
  } finally {
    if (fs.existsSync(lockPath)) fs.unlinkSync(lockPath);
  }
}

export function assertLocalDbReady() {
  const state = readState();
  const required = ['users','offers','trades','ledger','auditLogs','notifications','sessions','withdrawals','workerRuns'];
  for (const key of required) {
    if (!Array.isArray((state as any)[key])) throw new Error(`Local database missing collection: ${key}`);
  }
  return { ok: true, collections: required.length };
}
