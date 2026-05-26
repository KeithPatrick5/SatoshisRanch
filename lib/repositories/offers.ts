import { db } from '../db';
export function listOffers(){ return db.read().offers; }
export function findOffer(id:string){ return db.read().offers.find(o=>o.id===id); }
