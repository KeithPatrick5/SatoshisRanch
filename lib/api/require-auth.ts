import { readState } from '../local-store';
export function getLocalUser(){ return readState().users[0]; }
export function requireLocalUser(){ const user = getLocalUser(); if(!user) throw new Error('Auth required'); return user; }
