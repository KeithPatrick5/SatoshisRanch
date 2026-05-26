import crypto from 'crypto';

export type PasswordRecord = { salt: string; hash: string; algorithm: 'scrypt-sha256' };

export function hashPassword(password: string, pepper = ''): PasswordRecord {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(`${password}${pepper}`, salt, 64).toString('hex');
  return { salt, hash, algorithm: 'scrypt-sha256' };
}

export function verifyPassword(password: string, record: PasswordRecord, pepper = '') {
  const candidate = crypto.scryptSync(`${password}${pepper}`, record.salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(record.hash, 'hex'));
}

export function validatePasswordStrength(password: string) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
}
