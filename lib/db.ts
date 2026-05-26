import { readState, writeState } from './local-store';
import type { LocalState } from './types';

export type DbClient = {
  read(): LocalState;
  write(state: LocalState): LocalState;
  transaction<T>(fn: (state: LocalState) => T): T;
};

export const db: DbClient = {
  read: readState,
  write: writeState,
  transaction<T>(fn: (state: LocalState) => T): T {
    const state = readState();
    const result = fn(state);
    writeState(state);
    return result;
  },
};
