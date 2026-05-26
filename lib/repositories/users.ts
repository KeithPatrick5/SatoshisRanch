import { db } from '../db';
export function listUsers(){ return db.read().users; }
export function findUserByUsername(username:string){ return db.read().users.find(u=>u.username===username); }
export function findUserById(id:string){ return db.read().users.find(u=>u.id===id); }
