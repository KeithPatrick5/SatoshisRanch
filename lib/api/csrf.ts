import crypto from 'crypto';
import { cookies } from 'next/headers';

export const CSRF_COOKIE = 'sr_csrf';

export async function getCsrfToken() {
  const store = await cookies();
  let token = store.get(CSRF_COOKIE)?.value;
  if (!token) {
    token = crypto.randomBytes(24).toString('hex');
    store.set(CSRF_COOKIE, token, { httpOnly: false, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' });
  }
  return token;
}

export async function verifyCsrfFromForm(form: FormData) {
  const store = await cookies();
  const expected = store.get(CSRF_COOKIE)?.value;
  const actual = String(form.get('_csrf') ?? '');
  if (process.env.NODE_ENV !== 'production' && !expected) return true;
  if (!expected || !actual || expected !== actual) throw new Error('CSRF validation failed');
  return true;
}

export function csrfHiddenInput(token: string) {
  return `<input type="hidden" name="_csrf" value="${token.replace(/"/g, '&quot;')}" />`;
}
