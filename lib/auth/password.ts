import crypto from 'crypto';

export async function hashPassword(password: string, pepper = process.env.PASSWORD_PEPPER ?? 'local-pepper') {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(`${password}${pepper}`, salt, 64).toString('hex');
  return { hash: derived, salt };
}

export async function verifyPassword(password: string, salt: string, hash: string, pepper = process.env.PASSWORD_PEPPER ?? 'local-pepper') {
  const derived = crypto.scryptSync(`${password}${pepper}`, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(derived, 'hex'), Buffer.from(hash, 'hex'));
}
