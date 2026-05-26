import crypto from 'crypto';
export function createCsrfToken(){ return crypto.randomBytes(24).toString('hex'); }
export function verifyCsrfToken(a?: string, b?: string){ return Boolean(a && b && a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))); }
